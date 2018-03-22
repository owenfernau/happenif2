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

const Groups = ({ loading, groups, match, history }) => (
  <div className="groups">
    {groups.map((group) => {
      return (<div>{group.name}</div>);
    })}
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
  return {
    loading: !subscription.ready(),
    groups: GroupsCollection.find().fetch(), // [{ }]
  };
})(Groups);
