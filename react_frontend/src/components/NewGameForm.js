import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewGameForm extends React.Component {

  state = {
    pk: 0,
    game_name: "",
    release_year: null,
    time_to_complete: null,
    genre: ""
  };

  componentDidMount() {
    if (this.props.game) {
      const { pk, game_name, release_year, time_to_complete, genre } = this.props.game;
      this.setState({ pk, game_name, release_year, time_to_complete, genre });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createGame = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editGame = e => {
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
      <Form onSubmit={this.props.games ? this.editGame : this.createGame}>
        <FormGroup>
          <Label for="game_name">Game Name:</Label>
          <Input
            type="text"
            name="game_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.game_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="release_year">Release Year:</Label>
          <Input
            type="integer"
            name="release_year"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.release_year)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="time_to_complete">Time:</Label>
          <Input
            type="text"
            name="time_to_complete"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.time_to_complete)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="genre">Genre:</Label>
          <Input
            type="text"
            name="genre"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.genre)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewGameForm;
