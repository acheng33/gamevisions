import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants/index2";

class NewPreferenceForm extends React.Component {

  state = {
    username: "",
    preferences: []
  };

  componentDidMount() {
    if (this.props.preference) {
      const { username_id, preference_key, preference_value } = this.props.preference;
      this.setState({ username_id, preference_key, preference_value });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPreference = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPreference = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.preference ? this.editPreference : this.createPreference}>
        <FormGroup>
          <Label for="username_id">Username:</Label>
          <Input
            type="text"
            name="username_id"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.preference_key)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="preference_key">Preference Key:</Label>
          <Input
            type="text"
            name="preference_key"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.preference_key)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="preference_value">Preference Value:</Label>
          <Input
            type="text"
            name="preference_value"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.preference_value)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewPreferenceForm;
