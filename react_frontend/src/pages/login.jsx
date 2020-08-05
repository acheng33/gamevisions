import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {

  state = {
    username: '',
    password: '',
    logged_in: false
  }

  login = event => {
    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(data => data.json())
      .then(
        data => {
          console.log(data)
          sessionStorage.setItem("username", data.username)
          this.setState({logged_in:true})
        }
      )
      .catch(error => console.error(error))
  }

  register = event => {
    fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(data => data.json())
      .then(
        data => {
          console.log(data)
          sessionStorage.setItem("username", data.username)
          this.setState({logged_in:true})
        }
      )
      .catch(error => console.error(error))
  }
  
  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.logged_in) {
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <h1>Login user form</h1>

        <label>
          Username:
          <input type="text" name="username"
            value={this.state.username}
            onChange={this.inputChanged} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password"
            value={this.state.password}
            onChange={this.inputChanged} />
        </label>
        <br />
        <button onClick={this.login}>Login</button>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default (Login);