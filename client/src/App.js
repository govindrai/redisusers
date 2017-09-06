import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Grid, PageHeader } from "react-bootstrap";
import "./App.css";

// Components
import UsersNew from "./components/users/UsersNew";
import UsersIndex from "./components/users/UsersIndex";
import UsersShow from "./components/users/UsersShow";
import Header from "./components/layouts/Header";

class App extends Component {
  render() {
    return (
      <Grid>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={UsersIndex} />
              <Route path="/users/new" component={UsersNew} />
              <Route path="/users/search" component={UsersShow} />
              <Redirect from="/users" to="/" />
              <Route
                component={() =>
                  <PageHeader>
                    The page you've requested does not exist
                  </PageHeader>}
              />
            </Switch>
          </div>
        </Router>
      </Grid>
    );
  }
}

export default App;
