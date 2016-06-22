//import { Meteor } from 'meteor/meteor';
//import { Roles } from 'meteor/alanning:roles';
//
//import { Constants } from '../../../lib/collections/constants';
//
//import { Collection_MessageDatas } from '../../../lib/collections/Collection_MessageDatas';
//import { Collection_MessageControls } from '../../../lib/collections/Collection_MessageControls';
//import { Collection_MessageEvents } from '../../../lib/collections/Collection_MessageEvents';
//
//import { Collection_Devices } from '../../../lib/collections/Collection_Devices';
//import { Collection_Projects } from '../../../lib/collections/Collection_Projects';
//import { Collection_DeviceRules } from '../../../lib/collections/Collection_DeviceRules';
//
///********************************
// * Default Users
// ********************************/
//
//let now = new Date().getTime();
//
//if (Meteor.users.find().count() === 0) {
//
//    const users = [
//        {
//            name: "Normal User", email: "normal@example.com", password: "123456", roles: ['user'],
//            photo: "/test/photo1.jpg"
//        },
//
//        {
//            name: "Editor", email: "editor@microduino.cc", password: "123456", roles: ['editor'],
//            photo: "/test/photo2.jpg"
//        },
//        {
//            name: "Project Approval", email: "pm@microduino.cc", password: "123456", roles: ['project-approval'],
//            photo: "/test/photo1.jpg"
//        },
//        {
//            name: "Customer Care", email: "cc@microduino.cc", password: "123456", roles: ['customer-care'],
//            photo: "/test/photo1.jpg"
//        },
//        {
//            name: "Admin User", email: "admin@microduino.cc", password: "12345678", roles: ['admin'],
//            photo: "/test/photo1.jpg"
//        },
//        {
//            name: "Iasc Chen", email: "iasc@163.com", password: "123456", roles: ['admin', 'editor'],
//            photo: "/test/photo1.jpg"
//        }
//    ];
//
//    users.forEach(function (user) {
//        let id;
//
//        id = Accounts.createUser({
//            email: user.email,
//            password: user.password,
//            profile: { name: user.name, photo: user.photo }
//        });
//
//        if (user.roles.length > 0) {
//            // Need _id of existing user record so this call must come
//            // after `Accounts.createUser` or `Accounts.onCreate`
//            Roles.addUsersToRoles(id, user.roles);
//        }
//
//    });
//}
//
//let sysAdmin = Meteor.users.findOne({ "emails.address": "admin@microduino.cc" });
//let iasc = Meteor.users.findOne({ "emails.address": "iasc@163.com" });
//
///********************************
// * Default Collection_Projects
// ********************************/
//
//if (Collection_Projects.find().count() == 0) {
//
//    const projects = [
//        {
//            name: 'IoT Sensors', desc: 'Sensor of IOT',
//            secureToken: "12345", sketchSource: null
//        },
//        {
//            name: 'IoT Monitor', desc: 'Monitor of IOT',
//            secureToken: "12345", sketchSource: null
//        },
//        {
//            name: 'Weather Station', desc: 'Acquiring the weather information.',
//            secureToken: "12345", sketchSource: null
//        },
//    ];
//
//    projects.forEach (function (project) {
//        Object.assign(project, {
//            authorId: iasc._id, author: iasc.profile.name,
//            createAt: now, updateAt: now
//        });
//
//        Collection_Projects.insert(project);
//    });
//}
//
///********************************
// * Default Collection_Devices
// ********************************/
//
//if (Collection_Devices.find().count() == 0) {
//    let sensor_project_id = Collection_Projects.findOne({ name: "IoT Sensors" })._id;
//    let monitor_project_id = Collection_Projects.findOne({ name: "IoT Monitor" })._id;
//
//    const devices = [
//        {
//            name: 'IoT Sensors 1', desc: 'Sensor of IOT',
//            secureToken: "12345", projectId: sensor_project_id,
//            ownerId: iasc._id, owner: iasc.profile.name,
//        },
//        {
//            name: 'IoT Sensors 3', desc: 'Sensor of IOT',
//            secureToken: "12345", projectId: sensor_project_id,
//            ownerId: iasc._id, owner: iasc.profile.name,
//        },
//        {
//            name: 'IoT Monitor 1', desc: 'Monitor of IOT',
//            secureToken: "12345", projectId: monitor_project_id,
//            ownerId: iasc._id, owner: iasc.profile.name,
//        },
//        {
//            name: 'IoT Sensors 2', desc: 'Sensor of IOT',
//            secureToken: "12345", projectId: sensor_project_id,
//            ownerId: sysAdmin._id, owner: sysAdmin.profile.name,
//        },
//        {
//            name: 'IoT Monitor 2', desc: 'Monitor of IOT',
//            secureToken: "12345", projectId: monitor_project_id,
//            ownerId: sysAdmin._id, owner: sysAdmin.profile.name,
//        }
//    ];
//
//    devices.forEach (function (device) {
//        Object.assign(device, {
//            status: Constants.STATUS_NORMAL,
//            createAt: now, lastAccessAt: now
//        });
//
//        Collection_Devices.insert(device);
//    });
//}
//
//if (Collection_MessageDatas.find().count() == 0) {
//    let device = Collection_Devices.findOne({ name: "IoT Sensors 1" });
//
//    let datas = [
//        { temperature: 32.1, lightness: 1999 },
//        { temperature: 33.1, lightness: 1998 },
//        { temperature: 34.1, lightness: 1997 },
//        { temperature: 35.1, lightness: 1996 }
//    ];
//
//    let entity;
//    datas.forEach (function (data) {
//        entity = {
//            deviceId: device._id,
//            // token: device.secureToken,
//            payload: data,
//            createAt: now
//        };
//
//        Collection_MessageDatas.insert(entity);
//    });
//
//    device = Collection_Devices.findOne({ name: "IoT Sensors 3" });
//
//    datas = [
//        { temperature: 32.1, lightness: 1999 },
//        { temperature: 33.1, lightness: 1998 },
//    ];
//
//    datas.forEach (function (data) {
//        entity = {
//            deviceId: device._id,
//            // token: device.secureToken,
//            payload: data,
//            createAt: now
//        };
//
//        Collection_MessageDatas.insert(entity);
//    });
//}
//
///********************************
// * Default Device Rules
// ********************************/
//
//if (Collection_DeviceRules.find().count() == 0) {
//    const rules = [
//        { name: 'Rule 1', enabled: true, ownerId: iasc._id, owner: iasc.profile.name },
//        { name: 'Rule 2', enabled: false, ownerId: iasc._id, owner: iasc.profile.name },
//        { name: 'Rule 3', enabled: true, ownerId: sysAdmin._id, owner: sysAdmin.profile.name }
//    ];
//
//    rules.forEach (function (rule) {
//        Object.assign(rule, {
//            createAt: now, updateAt: now
//        });
//
//        Collection_DeviceRules.insert(rule);
//    });
//}