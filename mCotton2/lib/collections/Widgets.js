import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { STATUS_TYPES, STATUS_AUTO_FORM, STATUS_NORMAL } from '../constants';

const C_Widgets = new Mongo.Collection('widgets');

const schema = new SimpleSchema({
    title: {
        type: String
    },

    color: {
        type: String, label: "Color",
        optional: true
    },

    background: {
        type: String, label: "Background",
        optional: true
    },

    cols: {
        type: Number, defaultValue: 1
    },

    rows: {
        type: Number, defaultValue: 1
    },

    status: {
        type: Number, label: "Status",
        allowedValues: STATUS_TYPES,
        defaultValue: STATUS_NORMAL
    },
});

C_Widgets.attachSchema(schema);

export default C_Widgets;
