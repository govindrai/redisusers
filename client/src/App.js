import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Grid } from "react-bootstrap";

// Components
import UsersNew from "./components/users/UsersNew";
import UsersIndex from "./components/users/UsersIndex";
import UsersShow from "./components/users/UsersShow";
import Header from "./components/layouts/Header";
import NotFound from "./components/layouts/NotFound";

class App extends Component {
  render() {
    return (
      <Grid>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={props => <UsersIndex {...props} />}
              />
              <Route
                path="/users/new"
                component={props => <UsersNew {...props} />}
              />
              <Route path="/users/search" component={UsersShow} />
              <Redirect from="/users" to="/" />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Grid>
    );
  }
}

export default App;
