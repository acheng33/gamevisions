// import React, { Component} from 'react';
// import { Col, Container, Row } from "reactstrap";
// import UserList from "./UserList";
// import NewUserModal from "./NewUserModal";
//
// import axios from "axios";
//
// import { API_URL } from "../constants/index";
//
// class Login extends Component {
//
//   state = {
//     credentials: {username: '', password: ''}
//   }
//
//   login = event => {
//     fetch('http://127.0.0.1:8000/auth/', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(this.state.credentials)
//     })
//     .then( data => data.json())
//     .then(
//       data => {
//         this.props.userLogin(data.token);
//       }
//     )
//     .catch( error => console.error(error))
//   }
//
//   register = event => {
//     fetch('http://127.0.0.1:8000/api/users/', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(this.state.credentials)
//     })
//     .then( data => data.json())
//     .then(
//       data => {
//         console.log(data.token);
//       }
//     )
//     .catch( error => console.error(error))
//   }
//   inputChanged = event => {
//     const cred = this.state.credentials;
//     cred[event.target.name] = event.target.value;
//     this.setState({credentials: cred});
//   }
//
//   render() {
//     return (
//       <div>
//         <h1>Login user form</h1>
//
//         <label>
//           Username:
//           <input type="text" name="username"
//            value={this.state.credentials.username}
//            onChange={this.inputChanged}/>
//         </label>
//         <br/>
//         <label>
//           Password:
//           <input type="password" name="password"
//            value={this.state.credentials.password}
//            onChange={this.inputChanged} />
//         </label>
//         <br/>
//         <button onClick={this.login}>Login</button>
//         <button onClick={this.register}>Register</button>
//       </div>
//     );
//   }
// }
//
// export default Login;



import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import UserList from "./UserList";
import NewUserModal from "./NewUserModal";

import axios from "axios";

import { API_URL } from "../constants/index";

class Login extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.resetState();
  }

  getUsers = () => {
    axios.get(API_URL).then(res => this.setState({ users: res.data }));
  };

  resetState = () => {
    this.getUsers();
  };

  render() {
    console.log(this.state.users)
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <UserList
              users={this.state.users}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewUserModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
