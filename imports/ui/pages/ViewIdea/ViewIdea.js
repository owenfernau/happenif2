import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Ideas from '../../../api/Ideas/Ideas';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

const handleRemove = (ideaId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('ideas.remove', ideaId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Idea deleted!', 'success');
        history.push('/ideas');
      }
    });
  }
};

const renderIdea = (idea, match, history) => (idea ? (
  <div className="ViewIdea">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ idea && idea.idea }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(idea._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    { idea && idea.reasoning }
  </div>
) : <NotFound />);

const ViewIdea = ({
  loading, idea, match, history,
}) => (
  !loading ? renderIdea(idea, match, history) : <Loading />
);

ViewIdea.defaultProps = {
  idea: null,
};

ViewIdea.propTypes = {
  loading: PropTypes.bool.isRequired,
  idea: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const ideaId = match.params._id;
  const subscription = Meteor.subscribe('ideas.view', ideaId);

  return {
    loading: !subscription.ready(),
    idea: Ideas.findOne(ideaId),
  };
})(ViewIdea);
