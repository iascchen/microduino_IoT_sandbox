import RuleDefine from './RuleDefine';
import serverStatus from './serverStatus';

const vm = require('vm');

export function createRuleVM(ruleDefineFromDatabase) {
	const rule = new RuleDefine(ruleDefineFromDatabase);
	let currentData = {}, errorCallback;
	let successCallback = (data) => {
		throw new Error('createRuleVM().onControl() has not been called');
	};
	
	const vmOpts = {
		lineOffset: 2,
		columnOffset: 1,
		timeout: 1000,
		filename: `rule-${rule._id}.js`,
		displayErrors: true,
	};
	const scriptOpts = vmOpts.filename;
	
	const virtualGlobal = {};
	virtualGlobal.global = virtualGlobal;
	
	const theResult = {};
	const theResultChanged = [];
	
	const dataNames = rule.mapData((data) => {
		Object.defineProperty(virtualGlobal, data.displayName, {
			get(){
				if (currentData[data.deviceId]) {
					console.log('rule: get data `%s::%s`\n\tby name `%s` ; result= %s', data.deviceId,
						data.realName, data.displayName, currentData[data.deviceId][data.realName]);
					return currentData[data.deviceId][data.realName];
				} else {
					throw new Error(`server error: [no data] device id = "${data.deviceId}"`);
				}
			},
			set(v){
				throw new Error(`can't set data value "${data.deviceId}::${data.realName}"`);
			},
		});
		return data.displayName;
	});
	
	const controlNames = rule.mapControl((control) => {
		const dn = control.displayName;
		Object.defineProperty(virtualGlobal, dn, {
			get(){
				throw new Error(`can't get control value "${control.deviceId}::${control.realName}"`);
			},
			set(v){
				console.log('rule: set control %s::%s`\n\tby name `%s` ; changed=%s', control.deviceId, control.realName,
					control.displayName, theResult[dn] !== v);
				if (theResult[dn] !== v) {
					theResult[dn] = v;
					theResultChanged.push(control);
				}
			},
		});
		return control.displayName;
	});
	
	const virtualContext = vm.createContext(virtualGlobal);
	const script = new vm.Script(`(function ruleGeneratedCode() { "use strict";
${rule.generateCode()}
})()`, scriptOpts);
	
	rule.run = (data) => {
		serverStatus.lastRunRules = rule._id;
		console.log('rule %s `%s` is running', rule._id, rule.title);
		
		// init data & control
		currentData = data;
		theResultChanged.length = 0;
		
		try {
			script.runInContext(virtualContext, vmOpts);
		} catch (e) {
			if (errorCallback) {
				errorCallback(e);
			} else {
				console.error(e);
			}
			return;
		}
		console.log('rule result: ', theResult);
		
		if (theResultChanged.length) {
			const changed = {};
			theResultChanged.forEach((control) => {
				if (!changed[control.deviceId]) {
					changed[control.deviceId] = {};
				}
				changed[control.deviceId][control.realName] = theResult[control.displayName];
			});
			successCallback(changed);
		}
	};
	
	rule.onError = (fn) => {
		errorCallback = fn;
	};
	
	rule.onControl = (fn) => {
		successCallback = fn;
	};
	return rule;
}
