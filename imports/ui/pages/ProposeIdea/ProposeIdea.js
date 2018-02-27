import React from 'react';
import PropTypes from 'prop-types';

class ProposeIdea extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // this.thing = this.thing.bind(this);
  }

  render() {
    return (<div className="ProposeIdea">
      <h3>Propose an Idea</h3>
    </div>);
  }
}

ProposeIdea.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default ProposeIdea;