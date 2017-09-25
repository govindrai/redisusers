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
  constructor(props) {
    super(props);
    this.state = {
      userCreated: false,
      userDeleted: false
    };
  }

  showUserCreatedAlert = () => {
    this.setState({ userCreated: true });
  };

  hideUserCreatedAlert = () => {
    this.setState({ userCreated: false });
  };

  showUserDeletedAlert = () => {
    this.setState({ userDeleted: true });
  };

  hideUserDeletedAlert = () => {
    this.setState({ userDeleted: false });
  };

  // // DOES NOT HAVE ACCESS TO HISTORY
  // deleteUser = (email, history) => {
  //   axios.delete(`/api/users/${email}`).then(({ data: { status } }) => {
  //     if (status === "OK") {
  //       history.push("/?userDeleted=true");
  //       this.getUsers();
  //     }
  //   });
  // };
  //
  componentDidMount() {
    console.log("APP.js component just mounted");
  }

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
                component={props => (
                  <UsersIndex
                    {...props}
                    {...this.state}
                    showUserDeletedAlert={this.showUserDeletedAlert}
                    hideUserCreatedAlert={this.hideUserCreatedAlert}
                  />
                )}
              />
              <Route
                path="/users/new"
                component={props => (
                  <UsersNew
                    showUserCreatedAlert={this.showUserCreatedAlert}
                    {...props}
                  />
                )}
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
