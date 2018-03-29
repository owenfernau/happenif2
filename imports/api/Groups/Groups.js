import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Groups = new Mongo.Collection('Groups');

Groups.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Groups.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const GroupsSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the group.',
  },
  creator: {
    type: String,
    label: 'The person who created this group.',
  },
  users: {
    type: Array,
    label: 'The users who belong to this group.',
  },
  'users.$': {
    type: String,
    label: 'The ID of a user who belongs to this group.',
  },
});

Groups.attachSchema(GroupsSchema);

export default Groups;
