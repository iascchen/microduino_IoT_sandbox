import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

//import { Collections_Constants } from './constants';

export const DeviceRules = new Mongo.Collection('device_rules');

const schema = new SimpleSchema({
    name: { type: String },
    enabled: { type: Boolean },

    sourceIds: { type: [String], optional: true },
    targetIds: { type: [String], optional: true },
    processor: { type: String, optional: true },

    ownerId: { type: String },
    owner: { type: String },

    createAt: { type: Number },
    updateAt: { type: Number }
});

DeviceRules.attachSchema(schema);
