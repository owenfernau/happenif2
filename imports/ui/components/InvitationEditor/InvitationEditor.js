/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class InvitationEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        email: {
          required: true,
        },
      },
      messages: {
        email: {
          required: 'Need an email partner.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;

    Meteor.call('Invites.send', form.email.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.form.reset();
        Bert.alert('Invitation Sent!', 'success');
        history.push('/groups');
      }
    });
  }

  render() {
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="The email of the person to invite."
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {'Add Invite'}
        </Button>
      </form>
    );
  }
}

InvitationEditor.propTypes = {
  history: PropTypes.object.isRequired,
};

export default InvitationEditor;
