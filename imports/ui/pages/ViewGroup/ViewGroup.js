import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Groups from '../../../api/Groups/Groups';
import Ideas from '../../../api/Ideas/Ideas';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

// import './ViewGroup.scss';

const handleRemove = (IdeaId) => {
  if (confirm('Make sure you want to do this.')) {
    Meteor.call('ideas.remove', IdeaId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Idea deleted!', 'success');
      }
    });
  }
};

const vote = (type, ideaId) => {
  Meteor.call(type === 'upvote' ? 'ideas.upvote' : 'ideas.downvote', ideaId, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert('Vote submitted!', 'success');
    }
  });
};

const ViewGroup = ({
  loading, group, ideas, match, history,
}) => (!loading ? (
  <div className="ViewGroup">
    <div className="page-header clearfix">
      <h4 className="pull-left">{group.name}</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/propose`}>New Idea</Link>
    </div>
    {ideas.length ?
      <Table responsive>
        <thead>
          <tr>
            <th />
            <th>Idea Name</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {ideas.map(({
            _id, idea, votes, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>
                <button className="upvote" onClick={() => vote('upvote', _id)}><i className="fa fa-chevron-up" /></button>
                <p className="votes">{votes}</p>
                <button className="downvote" onClick={() => vote('downvote', _id)}><i className="fa fa-chevron-down" /></button>
              </td>
              <td>{idea}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                { /* match.url here equals the current URL in the browser, so, something like /groups/rw9r00we923ri0 */ }
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/ideas/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <Alert bsStyle="warning">No ideas yet!</Alert>}
  </div>
) : <Loading />);

ViewGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
  ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const groupId = match.params._id;
  const subscription = Meteor.subscribe('groups.view', groupId);
  return {
    loading: !subscription.ready(),
    group: Groups.findOne(groupId),
    ideas: Ideas.find().fetch(), // [{ }]
  };
})(ViewGroup);
