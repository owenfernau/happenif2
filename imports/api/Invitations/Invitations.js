/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Invitations = new Mongo.Collection('Invitations');

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invitations.schema = new SimpleSchema({
  sender: {
    type: String,
    label: 'The ID of the sender of this invitation.',
  },
  group: {
    type: String,
    label: 'The group for which this invitation is for.',
  },
recipientEmail: {
    type: String,
    label: 'The receiver of the invitation.',
  },
});

Invitations.attachSchema(Invitations.schema);

export default Invitations;
