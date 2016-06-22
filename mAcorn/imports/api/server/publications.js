import { Meteor } from 'meteor/meteor';

import { Counts } from 'meteor/tmeasday:publish-counts';

import { Constants } from '../../../lib/collections/constants';

import { Devices } from '../../../lib/collections/Devices';
import { Projects } from '../../../lib/collections/Projects';
import { DeviceRules } from '../../../lib/collections/DeviceRules';

import { MessageDatas } from '../../../lib/collections/MessageDatas';
import { MessageControls } from '../../../lib/collections/MessageControls';
import { MessageEvents } from '../../../lib/collections/MessageEvents';

/********************************
 * Collection_Devices
 ********************************/

const devicePubFields = {
    name: 1, desc: 1, status: 1
};

const getDevicesPublication = function (filter, pageSkip = 0) {
    let query = {};

    switch (filter.type) {
        case 'SHOW_ALL':
            break;
        case 'SHOW_NORMAL':
            query.status = Constants.STATUS_NORMAL;
            break;
        case 'SHOW_OWNER':
            query = {
                status: Constants.STATUS_NORMAL,
                $or: [{ ownerId: filter.ownerId }, { share: Constants.SHARE_PUBLIC }]
            };
            break;
        case 'SHOW_PUBLIC':
            query.share = Constants.SHARE_PUBLIC;
            query.status = Constants.STATUS_NORMAL;
            break;
        default:
            break;
    }

    Counts.publish(self, 'DeviceCount', Devices.find(query));
    // Counts.get('DeviceCount');

    return Devices.find(query, { fields: devicePubFields, skip: pageSkip, limit: 10 });
};

Meteor.publish('getDevices', getDevicesPublication);

/********************************
 * Old
 ********************************/

Meteor.publish('devices', function () {
    return Devices.find({});
});

Meteor.publish('my_devices', function () {
    return Devices.find({ ownerId: this.userId });
});

Meteor.publish('my_usable_devices', function () {
    return Devices.find({
        status: Constants.STATUS_NORMAL,
        $or: [{ ownerId: this.userId }, { share: Constants.SHARE_PUBLIC }]
    });
});

Meteor.publish('projects', function () {
    return Projects.find({});
});

Meteor.publish('device_rules', function () {
    return DeviceRules.find({});
});

Meteor.publish('my_device_rules', function () {
    return DeviceRules.find({ ownerId: this.userId });
});

Meteor.publish('m_datas', function () {
    return MessageDatas.find({});
});

Meteor.publish('m_devices_datas', function (dev_ids) {
    return MessageDatas.find({ $in: { _id: dev_ids } });
});

Meteor.publish('m_controls', function (dev_ids) {
    return MessageControls.find({ $in: { _id: dev_ids } });
});

Meteor.publish('m_events', function (dev_ids) {
    return MessageEvents.find({ $in: { _id: dev_ids } });
});