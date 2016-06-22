import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MessageControls = new Mongo.Collection('m_controls');

const schema = new SimpleSchema({
    deviceId: { type: String },
    createAt: { type: Number }, // Long of time stamp
    payload: { type: Object, blackbox: true }
});

MessageControls.attachSchema(schema);
