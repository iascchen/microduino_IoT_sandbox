/**
 * 控制规则引擎、和各个规则的启动与停止
 *
 * 规则引擎启动后，数据库中所有enabled的规则都将启动 (startRuleEngine, stopRuleEngine)
 * 单个规则可以随意起停，不受enabled限制 (startRule, stopRule)
 */

import C_TriggerRules from '../../lib/collections/TriggerRules';

import Scheduler from './Schedule';
import {createRuleVM} from './VM';
import DataMessageWatcher from './DataMessageWatcher';
import {SendMessage} from './DeviceController';

import serverStatus from './serverStatus';

let tr_handler;

export const ruleRegistry = {};
serverStatus.ruleRegistry = ruleRegistry;

const scheduler = new Scheduler;

export function startRuleEngine() {
	console.log('startRuleEngine()');
	if (tr_handler) {
		throw new Error('rule engine has already started');
	}
	serverStatus.started = true;
	tr_handler = C_TriggerRules.find({
		enabled: true,
	}).observe({
		added(ruleData) {
			console.log('rule will start: %s', ruleData._id);
			startRuleByData(ruleData); // rule id
		},
		changed(ruleData, oldData) {
			console.log('rule has changed: %s', ruleData._id);
			stopRule(oldData._id);
			startRuleByData(ruleData); // rule id
		},
		removed(oldData){
			console.log('rule has removed: %s', oldData._id);
			stopRule(oldData._id);
		}
	});
}

export function startRule(id) {
	const rd = C_TriggerRules.findOne(id);
	if (!rd) {
		throw new Error(`rule not found: id=${id}`);
	}
	return startRuleByData(rd);
}

function startRuleByData(ruleData) {
	if (ruleRegistry[ruleData._id]) {
		return ruleRegistry[ruleData._id];
	}
	const rule = createRuleVM(ruleData);
	console.log('creanted Rule VM: ', ruleData._id);
	serverStatus.ruleStarted = rule._id;

	rule.onError((error) => {
		console.warn('error in rule: ', error.stack);
		stopRule(rule._id);

		// TODO disable this rule ?
		// TODO save error to db !
	});

	rule.onControl((data)=> {
		console.log('do control: ');
		for (let i in data) {
			if (data.hasOwnProperty(i)) {
				console.log('\t %s: %j', i, data[i]);
			}
		}
		
		for (var deviceId in data) {
			if (data.hasOwnProperty(deviceId)) {
				SendMessage(deviceId, data[deviceId]);
			}
		}
	});

	scheduler.schedule(rule._id, rule.runInterval || 5000, rule.run);

	const watcher = new DataMessageWatcher((data) => {
		if (checkRuleCanRun(rule, data)) {
			scheduler.dispatch(rule._id, data);
		} else {
			console.log('rule %s skip this turn: ', rule._id, data);
		}
	});
	watcher.start(rule.getDataDeviceList());

	rule.stopWatcher = () => {
		watcher.stop();
	};

	ruleRegistry[rule._id] = rule;

	setTimeout(() => {
		watcher.fire(); // init state ?
	}, 0);
	return rule;
}

export function stopRule(id) {
	const rule = ruleRegistry[id];
	if (rule) {
		scheduler.cancel(rule._id);
		rule.stopWatcher();

		serverStatus.ruleStopped = rule._id;
		delete ruleRegistry[id];
		console.log('rule stopped: ', id);
	}
}

function checkRuleCanRun(rule, currentData) {
	return rule.mapData((data) => {
		return currentData[data.deviceId] && currentData[data.deviceId].hasOwnProperty(data.realName);
	}, 'every');
}
