import {DDP} from 'meteor/ddp';
import {Meteor} from 'meteor/meteor';
//import {Accounts} from 'meteor/accounts-base';
import { AccountsClient } from 'meteor/accounts-base'

const remoteUrl = 'ws://localhost:3000/';
const username = 'iasc@163.com';
const password = '123456';

console.log("In connectOak");

const RemoteConnection = DDP.connect(remoteUrl);

//Meteor.startup(function () {
//    //Seems that without this, on page refresh, it doesn't work.
//    //COMMENT: Ideally this should not be needed if the core takes care of this use case of a different connection for Accounts
//    //hack block 1***********
//    // let token = Accounts._storedLoginToken();
//    // let token = Meteor._localStorage.getItem('login token');
//
//    //if (token) {
//    //    Meteor.loginWithToken(token, function (err) {
//    //        // this is going to throw error if we logged out
//    //        if (err)
//    //            console.log(err);
//    //        else {
//    //            console.log('loginWithToken');
//    //
//    //            RemoteConnection.subscribe('my_device_rules');
//    //        }
//    //    });//loginWithToken
//    //}
//    //hack block 1***********
//});//startup function
//
//Accounts.connection = RemoteConnection;
////COMMENT: Ideally this should not be needed if the core takes care of this use case of a different connection for Accounts
////hack block 2***********
//Accounts.users = new Meteor.Collection('users', {
//    connection: RemoteConnection
//});
////hack block 2***********

//
//
////export const Remote = DDP.connect(Meteor.settings.public.remoteUrl);
//const Remote = DDP.connect(remoteUrl);
//
//Meteor.users = new Meteor.Collection('users', {
//    connection: Remote
//});

//Accounts.onLogin(function () {
//    // Meteor._localStorage.setItem('login token', Accounts._storedLoginToken());
//});

export const ServerDeviceRules = new Mongo.Collection('device_rules', { connection: RemoteConnection });

// console.log("Remote", Remote);

Meteor.startup(function () {

    //DDP.loginWithPassword(RemoteConnection, {
    //    email: username
    //}, password, function (error) {
    //    if (!error) {
    //        console.log(username + " is logged in!");
    //
    //        RemoteConnection.subscribe('my_device_rules');
    //
    //    } else {
    //        console.log(error);
    //    }
    //});
});

ServerDeviceRules.find().observe({
    added: function (item) {
        console.log('-- remote item added--');
        console.log(item);

        //var _temp = Items.findOne({_id: item._id});
        //if (!_temp) {
        //    console.log('-- local insert--');
        //    Items.insert(item);
        //}
    },
    removed: function (item) {
        console.log('-- remote items removed--');
        Meteor.call('delete');
    }
});

Meteor.publish('remote_device_rules', function () {
    return ServerDeviceRules.find();
});

//const Remote = DDP.connect('ws://localhost:3000/websocket' , function (error, wasReconnect){
//    if (error) {
//        console.log("DDP connection error!", error);
//        return;
//    }
//
//    if (wasReconnect) {
//        console.log("Reestablishment of a connection.");
//    }
//
//    console.log("connected!");
//
//    Remote.call("login", [{user: {email: useremail}, password: pwd}],
//        function (err, result) {
//            console.log(result);
//            user_id = result.id;
//            token = result.token;
//
//            if (token) {
//                console.log("Logined!", user_id, token);
//            }
//    });
//});

//Accounts.onLogin(function () {
//    Meteor._localStorage.setItem('login token', Accounts._storedLoginToken());
//});

//Remote.onReconnect = () => {
//    const token = Meteor._localStorage.getItem('login token');
//    if (token) {
//        Meteor.loginWithToken(token);
//    }
//};

//Remote.onReconnect = () => {
//    const token = Meteor._localStorage.getItem('login token');
//    if (token) {
//        Meteor.call('onReconnect', { token, userId }, (error, result) => {
//            // if all okay
//            Meteor.connection.setUserId(userId);
//        });
//    }
//};

export default RemoteConnection;

//Meteor.startup(function () {
//
//    const remote = DDP.connect();
//
//
//    // export const ServerDeviceRules = new Mongo.Collection('device_rules', {connection: remote});
//
//
//
////const accounts2 = new AccountsClient({connection: remote});
//    const ServerDeviceRules = new Mongo.Collection('device_rules', {connection: remote});
//    remote.subscribe('my_device_rules');
//
//    ServerDeviceRules.find().observe({
//        added: function (item) {
//            console.log('-- remote rule added--');
//            console.log(item);
//
//            //var _temp = Items.findOne({_id: item._id});
//            //if (!_temp) {
//            //    console.log('-- local insert--');
//            //    Items.insert(item);
//            //}
//        },
//        removed: function (item) {
//            console.log('-- remote rule removed--');
//            //Meteor.call('delete');
//        }
//    });
//};
