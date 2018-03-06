/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class IdeaEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        idea: {
          required: true,
        },
        reasoning: {
          required: true,
        },
      },
      messages: {
        idea: {
          required: 'What\'s your idea?',
        },
        reasoning: {
          required: 'Dude. What\'s your reasoning?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingIdea = this.props.idea && this.props.idea._id;
    const methodToCall = existingIdea ? 'ideas.update' : 'ideas.insert';
    const idea = {
      idea: form.idea.value.trim(),
      reasoning: form.reasoning.value.trim(),
    };

    if (existingIdea) idea._id = existingIdea;

    Meteor.call(methodToCall, idea, (error, ideaId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingIdea ? 'Idea updated!' : 'Idea added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/ideas/${ideaId}`);
      }
    });
  }

  render() {
    const { idea } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Idea</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="idea"
            defaultValue={idea && idea.idea}
            placeholder="No music in the therapy office."
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Reasoning</ControlLabel>
          <textarea
            className="form-control"
            name="reasoning"
            defaultValue={idea && idea.reasoning}
            placeholder="Because the music sucks and will depress people more."
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {idea && idea._id ? 'Save Changes' : 'Add Idea'}
        </Button>
      </form>
    );
  }
}

IdeaEditor.defaultProps = {
  idea: { title: '', body: '' },
};

IdeaEditor.propTypes = {
  idea: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default IdeaEditor;
