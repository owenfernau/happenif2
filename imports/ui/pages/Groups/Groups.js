/*
This is the page where users
can see all the groups of which
they're a member.

Maybe they can also see
minimal information about
what's going on in that
group. Like if there are
ideas that are soon to
"lock out."

Users could also potentially
see issues they had raised
and what the sentiment was
for those issues.


*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import GroupsCollection from '../../../api/Groups/Groups';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './Groups.scss';

const Groups = ({ loading, groups, match, history }) => (


  <div className="Groups">
    <div className="page-header clearfix">
      <h4 className="pull-left">My Groups</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/propose`}>New Group</Link>
    </div>
    {groups.length ?
      <Table responsive>
        <thead>
          <tr>

            <th>Group</th>
            <th># of Users</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {groups.map(({
            _id, name, users,
          }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{users && users.length}</td>
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
      </Table> : <Alert bsStyle="warning">no groups yet!</Alert>}
  </div>
)

  Groups.propTypes = {
      loading: PropTypes.bool.isRequired,
      groups: PropTypes.arrayOf(PropTypes.object).isRequired,
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };


export default withTracker(() => {
  const subscription = Meteor.subscribe('groups');
  console.log(GroupsCollection.find().fetch());
  console.log(history);
  return {
    loading: !subscription.ready(),
    groups: GroupsCollection.find().fetch(), // [{ }]
  };
})(Groups);
