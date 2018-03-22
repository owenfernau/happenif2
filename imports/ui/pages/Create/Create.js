import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, FormGroup, Button } from 'react-bootstrap';

class Create extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // In the constructor() this === the entire React component instance.
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('groups.insert', event.target.groupName.value, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.props.history.push('/groups');
      }
    });
  }

  render() {
    return (<div className="Create">
      <h3>Setup your first group</h3>
      <p>Groups are where all of your ideas will live in HappenIf.</p>
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>Group Name</ControlLabel>
          <input
            type="text"
            name="groupName"
            className="form-control"
            placeholder="Miss Havishum's Orthodontics"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">Create My First Group</Button>
      </form>
    </div>);
  }
}

Create.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default Create;
