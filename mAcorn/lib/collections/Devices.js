import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Devices = new Mongo.Collection('devices');

const schema = new SimpleSchema({
    name: { type: String },
    desc: { type: String, optional: true },

    profile: { type: Object, optional: true },

    ownerId: { type: String },
    owner: { type: String },

    secureToken: { type: String },

    projectId: { type: String, optional: true },

    liveStatus: { type: Object, optional: true },
    share: { type: String, optional: true },

    status: { type: String, optional: true },

    createAt: { type: Number },
    lastAccessAt: { type: Number, optional: true }
});

Devices.attachSchema(schema);
