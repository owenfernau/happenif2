import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Ideas from '../../../api/Ideas/Ideas';
import IdeaEditor from '../../components/IdeaEditor/IdeaEditor';
import NotFound from '../NotFound/NotFound';

const EditIdea = ({ match, idea, history }) => (idea ? (
  <div className="EditIdea">
    <h4 className="page-header">{`Editing "${idea.idea}"`}</h4>
    <IdeaEditor groupId={match.params.groupId} idea={idea} history={history} />
  </div>
) : <NotFound />);

EditIdea.defaultProps = {
  idea: null,
};

EditIdea.propTypes = {
  idea: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const ideaId = match.params.ideaId;
  const groupId = match.params.groupId;
  console.log(ideaId);
  const subscription = Meteor.subscribe('ideas.view', ideaId, groupId);
  console.log(Ideas.findOne(ideaId));
  return {
    loading: !subscription.ready(),
    idea: Ideas.findOne(ideaId),
  };
})(EditIdea);
