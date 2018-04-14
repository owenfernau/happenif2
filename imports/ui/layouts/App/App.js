/* eslint-disable jsx-a11y/no-href */

import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Navigation from '../../components/Navigation/Navigation';
import Authenticated from '../../components/Authenticated/Authenticated';
import Public from '../../components/Public/Public';
import Index from '../../pages/Index/Index';
import Documents from '../../pages/Documents/Documents';
import NewDocument from '../../pages/NewDocument/NewDocument';
import ViewDocument from '../../pages/ViewDocument/ViewDocument';
import EditDocument from '../../pages/EditDocument/EditDocument';
import ProposeIdea from '../../pages/ProposeIdea/ProposeIdea';
import ViewIdea from '../../pages/ViewIdea/ViewIdea';
import EditIdea from '../../pages/EditIdea/EditIdea';
import Ideas from '../../pages/Ideas/Ideas';
{/*this import below might not work yet.*/}
{/**/}
import Groups from '../../pages/Groups/Groups';
import ViewGroup from '../../pages/ViewGroup/ViewGroup';
import ProposeGroup from '../../pages/ProposeGroup/ProposeGroup'
import Create from '../../pages/Create/Create';
import Invite from '../../pages/Invite/Invite'

import Signup from '../../pages/Signup/Signup';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import VerifyEmail from '../../pages/VerifyEmail/VerifyEmail';
import RecoverPassword from '../../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Footer from '../../components/Footer/Footer';
import Terms from '../../pages/Terms/Terms';
import Privacy from '../../pages/Privacy/Privacy';
import ExamplePage from '../../pages/ExamplePage/ExamplePage';
import VerifyEmailAlert from '../../components/VerifyEmailAlert/VerifyEmailAlert';
import getUserName from '../../../modules/get-user-name';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { afterLoginPath: null };
    autoBind(this);
  }

  setAfterLoginPath(afterLoginPath) {
    this.setState({ afterLoginPath });
  }

  render() {
    const { props, state, setAfterLoginPath } = this;
    return (
      <Router>
        {!props.loading ? (
          <div className="App">
            {props.authenticated ?
              <VerifyEmailAlert
                userId={props.userId}
                emailVerified={props.emailVerified}
                emailAddress={props.emailAddress}
              />
              : ''}
            <Navigation {...props} {...state} />
            <Grid>
              <Switch>
                <Route exact name="index" path="/" component={Index} />
                <Authenticated exact path="/documents" component={Documents} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/new" component={NewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/:_id" component={ViewDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/documents/:_id/edit" component={EditDocument} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                {/*<Authenticated exact path="/ideas" component={Ideas} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />*/}
                <Authenticated exact path="/ideas" component={Ideas} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/profile" component={Profile} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />


                <Authenticated exact path="/groups" component={Groups} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/propose" component={ProposeGroup} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/:_id" component={ViewGroup} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/:_id/propose" component={ProposeIdea} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/:groupId/ideas/:ideaId" component={ViewIdea} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/:groupId/ideas/:ideaId/edit" component={EditIdea} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                <Authenticated exact path="/groups/:groupId/invite" component={Invite} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />
                {/*<Route name="groups" path="/groups" component={Groups}/>*/}


                <Public path="/signup" component={Signup} {...props} {...state} />
                <Authenticated path="/create" component={Create} setAfterLoginPath={setAfterLoginPath} {...props} {...state} />

                <Public path="/login" component={Login} {...props} {...state} />
                <Route path="/logout" render={routeProps => <Logout {...routeProps} setAfterLoginPath={setAfterLoginPath} />} {...props} {...state} />
                <Route name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
                <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
                <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
                <Route name="terms" path="/terms" component={Terms} />
                <Route name="privacy" path="/privacy" component={Privacy} />
                <Route name="examplePage" path="/example-page" component={ExamplePage} />
                <Route component={NotFound} />
              </Switch>
            </Grid>
            <Footer />
          </div>
        ) : ''}
      </Router>
    );
  }
}

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    roles: !loading && Roles.getRolesForUser(userId),
    userId,
    emailAddress,
    owen: "hello",
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);
