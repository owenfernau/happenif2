import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Ideas from './Ideas';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'ideas.insert': function ideasInsert(idea) {
    check(idea, {
      idea: String,
      reasoning: String,
      //adding group-property
      group: String,
    });

    try {
      return Ideas.insert({ owner: this.userId, ...idea }); // ...idea is unpacking the suitcase onto the new object.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'ideas.update': function ideasUpdate(idea) {
    check(idea, {
      _id: String,
      idea: String,
      reasoning: String,
      group: String,
    });

    try {
      const ideaId = idea._id;
      Ideas.update(ideaId, { $set: idea });
      return ideaId; // Return _id so we can redirect to idea after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'ideas.remove': function ideasRemove(ideaId) {
    check(ideaId, String);

    try {
      return Ideas.remove(ideaId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'ideas.upvote': function ideasUpvote(ideaId) {
    check(ideaId, String);

    try {
      const hasVoted = !!Ideas.findOne({ _id: ideaId, voters: { $in: [this.userId] } });

      if (hasVoted) {
        throw new Meteor.Error('500', 'Sorry, you\'ve already voted on this idea!');
      } else {
        Ideas.update({ _id: ideaId }, {
          $inc: {
            votes: 1,
          },
          $addToSet: {
            voters: this.userId,
          },
        });
      }

    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'ideas.downvote': function ideasDownvote(ideaId) {
    check(ideaId, String);

    try {
      const hasVoted = !!Ideas.findOne({ _id: ideaId, voters: { $in: [this.userId] } });

      if (hasVoted) {
        throw new Meteor.Error('500', 'Sorry, you\'ve already voted on this idea!');
      } else {
        Ideas.update({ _id: ideaId }, {
          $inc: {
            votes: -1,
          },
          $addToSet: {
            voters: this.userId,
          },
        });
      }

    } catch (exception) {
      handleMethodException(exception);
    }
  },  

});

rateLimit({
  methods: [
    'ideas.insert',
    'ideas.update',
    'ideas.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
