import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import PreferenceList from "./PreferenceList";
import NewPreferenceModal from "./NewPreferenceModal";

import axios from "axios";

import { API_URL } from "../constants/index2";

class Home extends Component {
  state = {
    preferences: []
  };

  componentDidMount() {
    this.resetState();
  }

  getPreferences = () => {
    axios.get(API_URL + "pengwing").then(res => this.setState({ preferences: res.data[0] }));
  };

  resetState = () => {
    this.getPreferences();
  };

  render() {
    console.log(this.state.preferences)
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <PreferenceList
              preferences={this.state.preferences}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewPreferenceModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
