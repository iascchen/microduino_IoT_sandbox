import C_Devices from '../../lib/collections/Devices';
import Fiber from 'fibers';

const deviceSendTimer = {};
const deviceData = {};

export function SendMessage(deviceId, data) {
	if (!deviceSendTimer[deviceId]) {
		deviceSendTimer[deviceId] = setTimeout(() => {
			delete deviceSendTimer[deviceId];

			const data = deviceData[deviceId];
			delete deviceData[deviceId];

			Fiber(function () {
				const target = C_Devices.findOne(deviceId);

				const entity = _.extend(data, {
					deviceId: target._id,
					token: target.secureToken,
				});

				const ret = Meteor.call('control.add', entity);
				console.log('send message to %s:\n\t data[%j]\n\t result[%j]', deviceId, entity, ret);
			}).run();
		}, 50);
	}
	if (!deviceData[deviceId]) {
		deviceData[deviceId] = {};
	}
	_.extend(deviceData[deviceId], data);
}

