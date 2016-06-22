import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { STATUS_NORMAL, STATUS_DISABLED, MSG_DATA, MSG_CONTROL, MSG_EVENT, SHARE_PUBLIC } from '../../../lib/constants';

import C_Boards from '../../../lib/collections/Boards';
import C_Modules from '../../../lib/collections/Modules';

import C_Devices from '../../../lib/collections/Devices';
import C_Projects from '../../../lib/collections/Projects';
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

const createMessageData = (params) => {
    let entity = formatDeviceUploadMsg(params);
    entity.msgType = MSG_DATA;
    return C_MessageDatas.insert(entity);
};

const createMessageControl = (params) => {
    let entity = formatDeviceUploadMsg(params);
    entity.msgType = MSG_CONTROL;
    return C_MessageDatas.insert(entity);
};

const createMessageEvent = (params)=> {
    let entity = formatDeviceUploadMsg(params);
    entity.msgType = MSG_EVENT;
    return C_MessageDatas.insert(entity);
};

const createDevice = (params)=> {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    C_Devices.insert(params);
};

const removeDevice = (entityId) => {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    C_Devices.remove(entityId);
};

const getDevices = () => {
    return C_Devices.find().fetch();
};

const getDeviceDatas = (devid) => {
    // return C_Devices.find().fetch();
    return C_MessageDatas.find({ deviceId: devid }).fetch()
};

const createProject = (params)=> {
    if (!params.text)
        throw new Meteor.Error('text missing', 'Cannot submit an empty message');

    C_Projects.insert(params);
};

const createDeviceRule = (params)=> {
    check(params, Object);
    check(params.name, String);

    const now = new Date().getTime();

    params.ownerId = Meteor.userId();
    params.enabled = false;
    params.createAt = now;
    params.updateAt = now;

    return C_TriggerRules.insert(params);
};

const toggleDeviceRule = (entityId) => {
    const device = C_TriggerRules.findOne({ _id: entityId });
    const enabled = device.enabled;
    const now = new Date().getTime();

    return C_TriggerRules.update({ _id: entityId }, { $set: { enabled: !enabled, updateAt: now } });
};

//const onReconnect = ({ token, userId }) => {
//    // validate token
//    this.setUserId(userId);
//};

Meteor.methods({
    'project.add': createProject,

    'device.get': getDevices,
    'device.add': createDevice,
    'device.remove': removeDevice,

    'device.datas': getDeviceDatas,

    'data.add': createMessageData,
    'control.add': createMessageControl,
    'event.add': createMessageEvent,

    'deviceRule.add': createDeviceRule,
    'deviceRule.toggle': toggleDeviceRule,
});
