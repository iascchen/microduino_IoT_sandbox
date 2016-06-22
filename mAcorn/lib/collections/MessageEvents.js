import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MessageEvents = new Mongo.Collection('m_events');

const schema = new SimpleSchema({
    deviceId: { type: String },
    createAt: { type: Number }, // Long of time stamp
    payload: { type: Object, blackbox: true }
});

MessageEvents.attachSchema(schema);
