import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

class NewPreferenceForm extends React.Component {

  state = {
    preference_key: "",
    preference_value: "",
  };

  componentDidMount() {
    if (this.props.preference) {
      const {preference_key, preference_value } = this.props.preference;
      this.setState({preference_key, preference_value });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPreference = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/" + sessionStorage.getItem("username"), this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPreference = e => {
    e.preventDefault();
    axios.put("http://localhost:8000/api/user/" + sessionStorage.getItem("username"), this.state).then(() => {
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
