import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

//import { Collections_Constants } from './constants';

const C_TriggerRules = new Mongo.Collection('trigger_rules');

const schema = new SimpleSchema({
	ownerId: {
		type: String, label: "Owner Id"
	},
	ownerName: {
		type: String, label: "Owner name",
		optional: true
	},
	title: {
		type: String
	},
	desc: {
		type: String,
		defaultValue: ''
	},
	enabled: {
		type: Boolean,
		defaultValue: false
	},
	usedDevices: {
		type: Match.Any
	},
	controls: {
		type: Match.Any,
	},
	datas: {
		type: Match.Any,
	},
	content: {
		type: Match.Any,
	},
	createAt: {
		type: Number, label: "Create at",
		defaultValue: function () {
			return new Date().getTime();
		}
	},
	updateAt: {
		type: Number, label: "Update at",
		autoValue: function () {
			return new Date().getTime();
		}
	}
});

C_TriggerRules.attachSchema(schema);

export default C_TriggerRules;
