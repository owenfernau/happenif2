import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Groups from '../Groups';
import Ideas from '../../Ideas/Ideas';

Meteor.publish('groups', function groups() {
  return Groups.find({ users: { $in: [this.userId] } });
});

Meteor.publish('groups.view', function groupsView(groupId) {
  check(groupId, String);
  return [
    Groups.find({ _id: groupId }), // TODO: Discuss security of this and passing this.userId.
    Ideas.find({ group: groupId }),
  ];
});
