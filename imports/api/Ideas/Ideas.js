/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Ideas = new Mongo.Collection('Ideas');

Ideas.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Ideas.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Ideas.schema = new SimpleSchema({
  title: {
    type: String, // Primitive type. String, Array, Number, Integer, Object
    label: 'The title of the idea.',
  },
  reasoning: {
    type: String,
    label: 'The reasoning behind the idea.',
  },
  votes: {
    type: Integer,
    label: 'The number of votes for this idea.',
  },
  voters: {
    type: Array, // ['235235235', '235i2p3oi5lkjsklj']
    label: 'Users who have upvoted or downvoted this idea.',
  },
  'voters.$': {
    type: String,
    label: 'The ID of a user who has voted.',
  },
});

// { Title: 'Test' }

Ideas.attachSchema(Ideas.schema);

export default Ideas;
