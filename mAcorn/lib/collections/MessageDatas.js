import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MessageDatas = new Mongo.Collection('m_datas');

const schema = new SimpleSchema({
    deviceId: { type: String },
    createAt: { type: Number }, // Long of time stamp
    payload: { type: Object, blackbox: true }
});

MessageDatas.attachSchema(schema);