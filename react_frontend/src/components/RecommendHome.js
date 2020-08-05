import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from "reactstrap";
import GameRecommendList from "./GameRecommendList";

import axios from "axios";

class RecommendHome extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.resetState();
  }

  getGames = () => {
    axios.get("http://localhost:8000/api/usergames/" + sessionStorage.getItem("username")).then(res => this.setState({ games: res.data }));
    console.log(axios.get("http://localhost:8000/api/usergames/" + sessionStorage.getItem("username")).then(res => this.setState({ games: res.data })))
  };

  resetState = () => {
    this.getGames();
  };

  render() {
    var buttonGameList;
    var buttonCancel;
    console.log(this.state.games)


    buttonGameList = (
      <Link to="/gamelist">
        <Button color="primary"
        className="float-right"
        onClick={this.toggle}
        style={{ minWidth: "200px" }}>Game List</Button>
      </Link>
    );

    buttonCancel = (
      <Link to="/profile">
        <Button color="primary"
        className="float-left"
        onClick={this.toggle}
        style={{ minWidth: "200px" }}>Cancel</Button>
      </Link>
    );

    return (
      <Fragment>
        <Container style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <GameRecommendList
                games={this.state.games}
                resetState={this.resetState}
                />
            </Col>
          </Row>
          {buttonCancel}
          {buttonGameList}
        </Container>
      </Fragment>
    );


  }
}

export default RecommendHome;
