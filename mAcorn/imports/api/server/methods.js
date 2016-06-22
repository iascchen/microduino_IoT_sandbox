import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { DDP } from 'meteor/ddp';

import { Constants, RemoteConnection } from '../../../lib/collections/constants';

import { Devices } from '../../../lib/collections/Devices';
import { Projects } from '../../../lib/collections/Projects';
import { DeviceRules } from '../../../lib/collections/DeviceRules';

import { MessageDatas } from '../../../lib/collections/MessageDatas';
import { MessageControls } from '../../../lib/collections/MessageControls';
import { MessageEvents } from '../../../lib/collections/MessageEvents';

/********************************
 * Utils
 ********************************/

const checkDeviceUploadToken = (params) => {
    check(params, Object);
    check(params.deviceId, String);
    check(params.token, String);

    const device = Devices.findOne({ _id: params.deviceId, secureToken: params.token });
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

const createMessageData = (params) => {
    let entity = formatDeviceUploadMsg(params);
    return MessageDatas.insert(entity);
};

const createMessageControl = (params) => {
    let entity = formatDeviceUploadMsg(params);
    return MessageControls.insert(entity);
};

const createMessageEvent = (params)=> {
    let entity = formatDeviceUploadMsg(params);
    return MessageEvents.insert(entity);
};

const createDevice = (params)=> {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    Devices.insert(params);
};

const removeDevice = (entityId) => {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    Devices.remove(entityId);
};

const getDevices = () => {
    return Devices.find().fetch();
};

const getDeviceDatas = (devid) => {
    // return Collection_Devices.find().fetch();
    return MessageDatas.find({ deviceId: devid }).fetch()
};

const createProject = (params)=> {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    Projects.insert(params);
};

const createDeviceRule = (params)=> {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    DeviceRules.insert(params);
};

const toggleDeviceRule = (entityId) => {
    const device = DeviceRules.findOne({ _id: entityId }, { fields: { enable: true } });
    const enabled = device.enable;
    return DeviceRules.update({ _id: entityId }, { $set: { enable: !enabled } });
};

const loginWithPassword = (email, password) => {
    DDP.loginWithPassword(RemoteConnection, {
        email: email
    }, password, function (error) {
        if (!error) {
            console.log(username + " is logged in!");

            RemoteConnection.subscribe('my_device_rules');

        } else {
            console.log(error);
        }
    });
};

Meteor.methods({
    loginWithPassword,

    'project.add': createProject,

    'device.get': getDevices,
    'device.add': createDevice,
    'device.remove': removeDevice,

    'device.datas': getDeviceDatas,

    'data.add': createMessageData,
    'control.add': createMessageControl,
    'event.add': createMessageEvent,

    'deviceRule.add': createDeviceRule,
    'deviceRule.toggle': toggleDeviceRule
});
