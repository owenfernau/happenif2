/*

Okay so this is where
the user can view the
ideas they raised and
potentially the ideas
they have voted on and
maybe also the ones they
"need" to vote on.

Right now it's all just
copy pasted from the
documents file
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Documents/Documents';
{/*don't know if this ideas import will work*/}
import IdeasCollection from '../../../api/Ideas/Ideas';
{/**/}
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './Ideas.scss';

const handleRemove = (IdeaId) => {
  if (confirm('Make sure you want to do this.')) {
    Meteor.call('documents.remove', IdeaId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Idea deleted!', 'success');
      }
    });
  }
};

const Documents = ({
  loading, documents, match, history,
}) => (!loading ? (
  <div className="Documents">
    <div className="page-header clearfix">
      <h4 className="pull-left">My Ideas</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/propose`}>New Idea</Link>
    </div>
    {documents.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Idea Name</th>
            <th>Group</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {documents.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>get idea group-property</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
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
      </Table> : <Alert bsStyle="warning">No documents yet!</Alert>}
  </div>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('documents');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch(),
  };
})(Documents);
