import React from 'react';
import PropTypes from 'prop-types';
import InvitationEditor from '../../components/InvitationEditor/InvitationEditor';
import Groups from '../../../api/Groups/Groups';
import { withTracker } from 'meteor/react-meteor-data';

const Invite = ({ history, group }) => (
  <div className="Invite">
    <h4 className="page-header">Invite to {group && group.name}</h4>
    <InvitationEditor history={history} />
  </div>
);

Invite.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const groupId = match.params.groupId;
  const subscription = Meteor.subscribe('invite', groupId);
  return {
    loading: !subscription.ready(),
    group: Groups.findOne(groupId),
  };
})(Invite);
