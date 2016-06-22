import { DDP } from 'meteor/ddp';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';

import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { Constants, RemoteConnection } from '../../../lib/collections/constants';

Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
});

Meteor.startup(function () {
    //Seems that without this, on page refresh, it doesn't work.
    //COMMENT: Ideally this should not be needed if the core takes care of this use case of a different connection for Accounts
    //hack block 1***********
    let token = Accounts._storedLoginToken();
    if (token) {
        Meteor.loginWithToken(token, function (err) {
            // this is going to throw error if we logged out
            if (err)
                console.log(err);
            else{
                console.log('loginWithToken');

                // Meteor.subscribe('remote_device_rules');
            }
        });//loginWithToken
    }
    //hack block 1***********
});//startup function

Accounts.connection = RemoteConnection;
//COMMENT: Ideally this should not be needed if the core takes care of this use case of a different connection for Accounts
//hack block 2***********
Accounts.users = new Meteor.Collection('users', {
    connection: RemoteConnection
});
//hack block 2***********


Tracker.autorun(function () {
    //No code which directly affects the functionality. Just for testing
    console.log(Meteor.user());
    Accounts.connection.call('user', function (err, result) {
        if (err)
            console.log(err);
        if (result) {
            console.log(result);
            if (result._id === Meteor.user()._id) {
                console.log("Server and client shows that the same user has logged in");
            } else {
                console.log("Server and client shows different users");
            }
        }
    })
});

Template.register.events({
    'submit #register-form': function (e, t) {
        e.preventDefault();
        let email = t.find('#account-email').value
            , password = t.find('#account-password').value;

        Accounts.createUser({ email: email, password: password }, function (err, result) {
            if (err) {
                // Inform the user that account creation failed
                console.log(err);
            } else {
                // Success. Account has been created and the user
                // has logged in successfully.
                console.log("registered user");
                console.log('response is ' + result);
                console.log(Meteor.user());
            }
        });//createUser
        return false;
    }
});//register

Template.login.events({
    'submit #login-form': function (e, t) {
        e.preventDefault();
        let email = t.find('#login-email').value
            , password = t.find('#login-password').value;
        Meteor.loginWithPassword(email, password, function (err) {
            if (err)
                console.log(err);
            else
            // The user has been logged in.
                console.log('logged in successfully');
        });
        return false;
    }
});//login

Template.statusloggedin.events({
    'click #logout': function (e, t) {
        e.preventDefault();
        Meteor.logout();
        return false;
    }
});//logout