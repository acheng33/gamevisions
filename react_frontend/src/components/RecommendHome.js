import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
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
    console.log(this.state.games)
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <GameRecommendList
              games={this.state.games}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        </Container>
    );
  }
}

export default RecommendHome;
