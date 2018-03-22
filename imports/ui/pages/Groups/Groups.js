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
import IdeasCollection from '../../../api/Ideas/Ideas';
{/**/}
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';



const Groups = (
  loading, ideas, match, history,
) =>
  <div className="groups">
  <h1>HI BYE</h1>
  <h1>{Groups.length}</h1>
  {/*
    the Group.length property is connected to
    those four properties: loading, ideas,
    match, history. Can't really tell if any of
    of those properties are defined. I think not
    though. It's not getting the same
    information that the ideas page has.
  */}
  {/*<h1>{match.url}</h1>*/}
  {Groups.length?
    <h1>Love</h1>

  : <Alert bsStyle="warning">No ideas yet!</Alert>}
  {/*<h1>{Groups.ideas.map(({
    _id, idea, group, votes, createdAt, updatedAt,
  }) => (
    <tr key={_id}>
      <td>{idea}</td>
      </tr>
    ))}
*/}

  <h1></h1>
  <h1>YO</h1>
    </div>

  Groups.propTypes = {
      loading: PropTypes.bool.isRequired,
      ideas: PropTypes.arrayOf(PropTypes.object).isRequired,
      match: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };


export default withTracker(() => {
  const subscription = Meteor.subscribe('ideas');
  console.log("hi");
  return {
    loading: !subscription.ready(),
    ideas: IdeasCollection.find().fetch(), // [{ }]
  };
})(Groups);
