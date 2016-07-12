// import '../imports/startup/server/fixtures';
// import '../imports/startup/server/security';

import '../imports/api/server/methods';
import '../imports/api/server/publications';

import '../imports/mqtt/server/mqttServer';
import '../imports/mqtt/server/mqttTriggers';

//import '../imports/triggers/server/triggers';

import C_MessageDatas from '../lib/collections/MessageDatas';

Meteor.methods({
	fakeData(param) {
		check(param, Object);

		const newData = {
			"msgType": 0,
			"payload": param.payload,
			"deviceId": param.id,
			"createAt": Date.now(),
		};
		console.log('fake data insert: ', newData);
		return C_MessageDatas.insert(newData);
	},
});
