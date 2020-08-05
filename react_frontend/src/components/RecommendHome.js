import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import GameRecommendList from "./GameRecommendList";
// import NewGameModal from "./NewGameModal";

import axios from "axios";

// import { API_URL } from "../constants/index";

class RecommendHome extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.resetState();
  }

  getGames = () => {
    axios.get("http://localhost:8000/api/usergames/pengwing").then(res => this.setState({ games: res.data }));
    console.log(axios.get("http://localhost:8000/api/usergames/pengwing").then(res => this.setState({ games: res.data })))
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
