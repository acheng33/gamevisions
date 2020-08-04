import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

// import { API_URL } from "../constants/index2";

class NewPreferenceForm extends React.Component {

  // result = "";

  state = {
    username_id: "",
    preference_key: "",
    preference_value: "",
    currentUser: ""
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

  getCurrentUser = () => {
    axios.get("http://localhost:8000/api/username/").then(res => this.setState({ currentUser: res.data[0]["username"]}));
  }

  createPreference = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/user/" + this.getCurrentUser(), this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editPreference = e => {
    e.preventDefault();
    axios.put("http://localhost:8000/api/user/" + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    // console.log("this is the currentUser: ")
    // console.log(this.state.currentUser)
    // console.log("this is the result: (should be same as currentUser)")
    // console.log(this.result)
    return (
      <Form onSubmit={this.props.preference ? this.editPreference : this.createPreference}>
        <FormGroup>
          <Label for="username_id">Username:</Label>
          <Input
            type="text"
            name="username_id"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.username_id)}
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
