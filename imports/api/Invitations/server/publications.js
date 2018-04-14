import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Groups from '../../Groups/Groups';

Meteor.publish('invite', function invite(groupId) {
  check(groupId, String);
  return [
    Groups.find({ _id: groupId }), // TODO: Discuss security of this and passing this.userId.
  ];
});
