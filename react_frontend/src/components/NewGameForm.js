import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewGameForm extends React.Component {

  state = {
    game_name: "",
    release_year: null,
    time_to_complete: null,
    genre: "",
    platforms: [],
  };

  componentDidMount() {
    if (this.props.game) {
      const { game_name, release_year, time_to_complete, genre, platform_name,rating, single_player, multiplayer, cooperative, mods } = this.props.game;
      this.setState({ game_name, release_year, time_to_complete, genre, platform_name,rating, single_player, multiplayer, cooperative, mods });
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
            type="number"
            name="release_year"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.release_year)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="time_to_complete">Time:</Label>
          <Input
            type="number"
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
        <FormGroup>
          <Label for="platform_name">Platform Name:</Label>
          <Input
            type="text"
            name="platform_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.platform_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Rating:</Label>
          <Input
            type="number"
            name="rating"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.rating)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="single_player">Single Player:</Label>
          <Input
            type="number"
            name="single_player"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.single_player)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="multiplayer">Multi-player:</Label>
          <Input
            type="number"
            name="multiplayer"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.multiplayer)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cooperative">Cooperative:</Label>
          <Input
            type="number"
            name="cooperative"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.cooperative)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="mods">Mods:</Label>
          <Input
            type="number"
            name="mods"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.mods)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewGameForm;
