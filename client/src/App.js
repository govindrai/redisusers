import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Components
import UsersNew from "./components/users/UsersNew";
import UsersIndex from "./components/users/UsersIndex";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={UsersIndex} />
          <Route path="/users/new" component={UsersNew} />
        </Switch>
      </Router>
    );
  }
}

export default App;
