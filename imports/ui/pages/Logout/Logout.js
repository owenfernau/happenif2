import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import Icon from '../../components/Icon/Icon';

import './Logout.scss';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <div className="Logout">
        <img
          src="http://i59.tinypic.com/2v16n3c.png"
          alt="Happen If"
        />
        {/*<h1>Bye!</h1>*/}
        <p>{}</p>
        <h1>bye</h1>
        {/*<p>{'Don\'t forget to like and follow Clever Beagle elsewhere on the web:'}</p>*/}
        <ul className="FollowUsElsewhere">
          <li><a href="https://facebook.com/cleverbeagle"><Icon icon="facebook-official" /></a></li>
          <li><a href="https://twitter.com/clvrbgl"><Icon icon="twitter" /></a></li>
          <li><a href="https://github.com/cleverbeagle"><Icon icon="github" /></a></li>
        </ul>
      </div>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
