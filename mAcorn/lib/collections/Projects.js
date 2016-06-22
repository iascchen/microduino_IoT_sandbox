import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Projects = new Mongo.Collection('projects');

const schema = new SimpleSchema({
    authorId: { type: String },
    secureToken: { type: String },

    name: { type: String },
    desc: { type: String, optional: true },

    sketchSource: { type: String, optional: true },

    status: { type: String, optional: true },

    createAt: { type: Number },
    updateAt: { type: Number },
});

Projects.attachSchema(schema);
