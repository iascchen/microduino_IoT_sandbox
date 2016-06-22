import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';


import {Layout} from '../../ui/layouts/Layout';

import {Home} from '../../ui/views/Home';

FlowRouter.route("/", {
    subscriptions: function () {
        this.register('devices', Meteor.subscribe('my_usable_devices'));
        this.register('device_rules', Meteor.subscribe('my_device_rules'));
        this.register('m_data', Meteor.subscribe('m_datas'));
    },
    action() {
        mount(Layout, {
            content: (<Home />)
        });
    }
});

FlowRouter.route("/rule/:id/edit", {
    subscriptions: function () {
        this.register('device_rules', Meteor.subscribe('device_rules'));
    },
    action() {
        mount(Layout, {
            content: (<DeviceRuleEditor />)
        });
    }
});

//FlowRouter.route('/lists/:_id', {
//    name: 'Lists.show',
//    action(params, queryParams) {
//        console.log("Looking at a list?");
//    }
//});

//var adminRoutes = FlowRouter.group({
//    prefix: '/admin',
//    name: 'admin',
//    triggersEnter: [function(context, redirect) {
//        console.log('running group triggers');
//    }]
//});
//
//// handling /admin route
//adminRoutes.route('/', {
//    action: function() {
//        BlazeLayout.render('componentLayout', {content: 'admin'});
//    },
//    triggersEnter: [trackRouteEntry],
//    triggersExit: [trackRouteClose]
//});
//
//function trackRouteEntry(context) {
//    // context is the output of `FlowRouter.current()`
//    Mixpanel.track("visit-to-home", context.queryParams);
//}
//
//function trackRouteClose(context) {
//    Mixpanel.track("move-from-home", context.queryParams);
//}