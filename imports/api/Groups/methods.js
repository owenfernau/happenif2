import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Groups from './Groups';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'groups.insert': function groupsInsert(groupName) {
    check(groupName, String);

    try {
      return Groups.insert({ name: groupName, users: [this.userId] });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
