import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import PreferenceList from "./PreferenceList";
import NewPreferenceModal from "./NewPreferenceModal";

import axios from "axios";

import { API_URL } from "../constants/index2";

let result = ""

class Home extends Component {

   state = {
     preferences: [],
     currentUser: ""
   };

  componentDidMount() {
    this.resetState();
  }

  getCurrentUser = () => {
    axios.get("http://localhost:8000/api/username/").then(res => this.setState({ currentUser: res.data[0]["username"]}))
  }

  getPreferences = () => {
    // this.state.result = this.getCurrentUser()
    // console.log("this is the result:")
    // console.log(result)
    // console.log("this is the getPreferences: ")
    console.log("http://localhost:8000/api/user/" + this.state.currentUser)
    axios.get("http://localhost:8000/api/user/" + this.state.currentUser).then(res => this.setState({ preferences: res.data[0] }));
  }


  async resetState() {
    var result = await this.getCurrentUser();
    var secondResult = this.getPreferences();
  };

  render() {
    console.log(this.state.preferences)
    console.log(this.state.currentUser)
    console.log("this is the funciton: ")
    console.log(this.getCurrentUser())
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
