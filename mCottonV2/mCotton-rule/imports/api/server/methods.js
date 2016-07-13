import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {STATUS_NORMAL, STATUS_DISABLED, MSG_DATA, MSG_CONTROL, MSG_EVENT, SHARE_PUBLIC} from '../../../lib/constants';

import C_Devices from '../../../lib/collections/Devices';
import C_TriggerRules from '../../../lib/collections/TriggerRules';

import C_MessageDatas from '../../../lib/collections/MessageDatas';

/********************************
 * Utils
 ********************************/

const checkDeviceUploadToken = (params) => {
	// console.log(JSON.stringify(params));

	check(params, Object);
	check(params.deviceId, String);
	check(params.token, String);

	const device = C_Devices.findOne({ _id: params.deviceId, secureToken: params.token });
	check(device, Object);
};

const formatDeviceUploadMsg = (params) => {
	checkDeviceUploadToken(params);

	let devId = params.deviceId;

	const entity = {
		deviceId: devId,
		createAt: new Date().getTime()
	};

	delete params.deviceId;
	delete params.token;
	entity.payload = params;

	return entity;
};

/********************************
 * Methods
 ********************************/

const createMessageControl = (params) => {
	let entity = formatDeviceUploadMsg(params);
	entity.msgType = MSG_CONTROL;
	return C_MessageDatas.insert(entity);
};

const listDevices = () => {
	return C_Devices.find().fetch();
};

const ObjectID = require('mongodb').ObjectID;
const upsertDeviceRule = (params)=> {
	console.log(JSON.stringify(params, null, 4));
	check(params, Object);

	const now = new Date().getTime();

	if (!params._id) {
		params._id = (new ObjectID()).toHexString();
		params.enabled = false;
		params.createAt = now;
		params.ownerId = Meteor.userId() || 'TODO: login system';
	}

	params.updateAt = now;

	const rawdb_TriggerRules = C_TriggerRules.rawDatabase();

	return new Promise((resolve, reject) => {
		rawdb_TriggerRules.command({
			findAndModify: 'trigger_rules',
			query: { _id: params._id },
			update: { $set: params },
			'new': true,
			upsert: true,
		}, function (err, result) {
			if (err || !result.ok) {
				console.error(err);
				// The card has been declined
				throw new Meteor.Error(err.message);
			}
			console.info('Save Complete !');
			resolve({
				success: true,
				doc: result.value,
				message: 'Save Complete !'
			});
		});
	});
};

const getDeviceRule = (ruleId) => {
	const x = C_TriggerRules.findOne(ruleId);
	console.log('find rule', x)
	return x
};

const toggleDeviceRule = (entityId) => {
	const device = C_TriggerRules.findOne({ _id: entityId });
	const enabled = device.enabled;
	const now = new Date().getTime();

	return C_TriggerRules.update({ _id: entityId }, { $set: { enabled: !enabled, updateAt: now } });
};

function listDeviceRule() {
	// todo: only get current user's devices
	return C_TriggerRules.find().fetch();
}

Meteor.methods({
	'control.add': createMessageControl,

	'deviceRule.upsert': upsertDeviceRule,
	'deviceRule.get': getDeviceRule,
	'deviceRule.toggle': toggleDeviceRule,
	'deviceRule.list': listDeviceRule,
});
