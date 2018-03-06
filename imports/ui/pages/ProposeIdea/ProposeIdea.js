import React from 'react';
import PropTypes from 'prop-types';
import IdeaEditor from '../../components/IdeaEditor/IdeaEditor.js'

class ProposeIdea extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // this.thing = this.thing.bind(this);
  }

  render() {
    const {history} = this.props; // Destructuring. Assume this.props is a bunch of grapes and the { history } part is us plucking off the "history" grape. 
    return (

      <div className="ProposeIdea">
        <h3 className="page-header">Propose an Idea</h3>
        <IdeaEditor history={history} />
      </div>

    );
  }
}

ProposeIdea.propTypes = {
  // prop: PropTypes.string.isRequired,

};

export default ProposeIdea;
