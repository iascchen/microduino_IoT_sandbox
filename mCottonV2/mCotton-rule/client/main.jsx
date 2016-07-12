import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import NotFound from './pages/NotFound';

Meteor.getBackCollection = function getBackCollection(collname) {
	const store = Meteor.connection._stores[collname];
	return store ? store._getCollection() : new Meteor.Collection(collname);
};

import extendMeteor from './meteor-call-async';
extendMeteor(Meteor);

Meteor.startup(() => {
	injectTapEventPlugin();
	render(<Router history={browserHistory}>
		<Route path="/" component={Dashboard}/>
		<Route path="/editor" component={Editor}/>
		<Route path="/editor/:ruleId" component={Editor}/>
		<Route path="*" component={NotFound}/>
	</Router>, $('<div id="ReactRoot">').appendTo(document.body)[0]);
});
