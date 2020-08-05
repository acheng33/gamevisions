import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

class NewGameForm extends React.Component {

  state = {
    game_name: "",
    release_year: null,
    time_to_complete: null,
    genre: "",
    platform_name: "",
    rating: null,
    single_player: null,
    multiplayer: null,
    cooperative: null,
    mods: null
  };

  componentDidMount() {
    if (this.props.game && this.props.platform) {
      const { game_name, release_year, time_to_complete, genre } = this.props.game;
      const { platform_name, rating, single_player, multiplayer, cooperative, mods } = this.props.platform;
      this.setState({
        game_name, release_year, time_to_complete, genre, platform_name, rating,
        single_player: single_player ? 1 : 0,
        multiplayer: multiplayer ? 1 : 0,
        cooperative: cooperative ? 1 : 0,
        mods: mods ? 1 : 0
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createGame = e => {
    console.log("create is triggered")
    e.preventDefault();
    axios.post("http://localhost:8000/api/games/", this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editGame = e => {
    console.log("reach put")
    e.preventDefault();
    axios.put("http://localhost:8000/api/games/" + this.state.game_name, this.state).then(() => {
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
      <Form onSubmit={this.props.create ? this.createGame : this.editGame}>
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
            max={5}
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.rating)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="single_player">Single Player:</Label>
          <Input
            type="number"
            min={0}
            max={1}
            name="single_player"
            onChange={this.onChange}
            placeholder = {"Enter a number here (1 for yes and 0 for No)"}
            value={this.defaultIfEmpty(this.state.single_player)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="multiplayer">Multi-player:</Label>
          <Input
            type="number"
            min={0}
            max={1}
            name="multiplayer"
            onChange={this.onChange}
            placeholder = {"Enter a number here (1 for yes and 0 for No)"}
            value={this.defaultIfEmpty(this.state.multiplayer)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cooperative">Cooperative:</Label>
          <Input
            type="number"
            min={0}
            max={1}
            name="cooperative"
            onChange={this.onChange}
            placeholder = {"Enter a number here (1 for yes and 0 for No)"}
            value={this.defaultIfEmpty(this.state.cooperative)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="mods">Mods:</Label>
          <Input
            type="number"
            min={0}
            max={1}
            name="mods"
            onChange={this.onChange}
            placeholder = {"Enter a number here (1 for yes and 0 for No)"}
            value={this.defaultIfEmpty(this.state.mods)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewGameForm;
