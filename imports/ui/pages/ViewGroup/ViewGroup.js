import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import GroupsCollection from '../../../api/Groups/Groups';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';


const renderGroup = (group, match, history) => (group ? (
  <div className="ViewGroup">
  <h1>hi</h1>


  </div>
) : <NotFound />);


const ViewGroup = ({
  loading, group, match, history,
}) => (
    !loading ? renderGroup(group, match, history) : <Loading />
);

ViewGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
  group: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const groupId = match.params._id;
  const subscription = Meteor.subscribe('groups.view', groupId);

  return {
    loading: !subscription.ready(),
    groups: GroupsCollection.find().fetch(),
  };
})(ViewGroup);
