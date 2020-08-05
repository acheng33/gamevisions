import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants/index";

class NewUserForm extends React.Component {

  state = {
    username: "",
    email: "",
    pwd: ""
  };

  componentDidMount() {
    if (this.props.users) {
      const {id, username} = this.props.users;
      this.setState({id, username});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createUser = e => {
    console.log("create is triggered")
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editUser = e => {
    console.log("reach put")
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
        console.log("put is triggered")
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.users ? this.editUser : this.createUser}>
        <FormGroup>
          <Label for="username">User Name:</Label>
          <Input
            type="text"
            name="username"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.username)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pwd">Password:</Label>
          <Input
            type="text"
            name="pwd"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.pwd)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewUserForm;
