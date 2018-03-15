import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Ideas from '../Ideas';

Meteor.publish('ideas', function ideas() {
  return Ideas.find();
});

// Note: ideas.view is also used when editing an existing document.
Meteor.publish('ideas.view', function ideasView(ideaId) {
  check(ideaId, String);
  return Ideas.find({ _id: ideaId, owner: this.userId });
});
