import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Loginpage from './pages/login';
import Profilepage from './pages/profile';
import GameListpage from './pages/gameList';
import NotFoundPage from './pages/404';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
          <Router>
            <Switch>
              <Route exact path='/' component={ Loginpage }></Route>
              <Route exact path='/profile' component={ Profilepage }></Route>
              <Route exact path='/gameList' component={ GameListpage }></Route>
              <Route exact path='/404' component={ NotFoundPage }></Route>
              <Redirect to="/404"></Redirect>
            </Switch>
          </Router>
      </Fragment>

    );
  }
}

export default App;
