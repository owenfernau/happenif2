import React from 'react';
import PropTypes from 'prop-types';

class ProposeIdea extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // this.thing = this.thing.bind(this);
  }

  render() {
    return (

      <div className="ProposeIdea">
      <h3>Propose an Idea</h3>
      //Testing...
      <h3> Hello, {this.props.title}, what up.</h3>
      //<form>
        //Damn, now nothing is showing up.
        //is name necessary here?
        /*says these input tags needs closing. what?
        <input type="text" name="proposal"/>
        <input type="text" name="reasoning"/>
        */
      //</form>
    </div>

    );
  }
}

ProposeIdea.propTypes = {
  // prop: PropTypes.string.isRequired,

};

export default ProposeIdea;
