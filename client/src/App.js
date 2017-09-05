import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";
import "./App.css";

// Components
import UsersNew from "./components/users/UsersNew";
import UsersIndex from "./components/users/UsersIndex";
import UsersSearch from "./components/users/UsersSearch";
import Header from "./components/layouts/Header";

class App extends Component {
  render() {
    return (
      <Grid>
        <Router>
          <div>
            <Route component={props => <Header {...props} />} />
            <Route exact path="/" component={UsersSearch} />
            <Route path="/users" component={UsersIndex} />
            <Route path="/users/new" component={UsersNew} />
          </div>
        </Router>
      </Grid>
    );
  }
}

export default App;
