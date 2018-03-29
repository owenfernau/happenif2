import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Ideas from '../Ideas';
import Groups from '../../Groups/Groups';

Meteor.publish('ideas', function ideas() {
  return Ideas.find();
});

// Note: ideas.view is also used when editing an existing document.
Meteor.publish('ideas.view', function ideasView(ideaId, groupId) {
  check(ideaId, String);
  check(groupId, String);
  return [
    Ideas.find({ _id: ideaId }),
    Groups.find({ _id: groupId }, { fields: { name: 1 } }),
  ];
});
