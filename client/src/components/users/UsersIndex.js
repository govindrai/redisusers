import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageHeader, Alert, Image } from "react-bootstrap";

import RenderUser from "./RenderUser";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchingUsers: true
    };
  }

  componentDidMount() {
    setTimeout(this.getUsers, 1000);
  }

  getUsers = () => {
    axios.get("/api/users").then(({ data: { status, data } }) => {
      if (status === "OK") {
        return this.setState({
          users: data,
          fetchingUsers: false
        });
      }
    });
  };

  handleDismiss = alertName => {
    this.setState({ ["show" + alertName]: false });
  };

  render = () => {
    console.log("index just rendered");
    const { search } = this.props.location;
    return (
      <div>
        {/* PAGE HEADER */}
        <PageHeader>Redis Users</PageHeader>

        {/* ALERTS */}
        {search === "?userCreated=true" && (
          <AlertContainer
            show={this.state.showUserCreatedAlert}
            bsStyle="success"
            name="UserCreatedAlert"
            onDismiss={this.handleDismiss}
          >
            <strong>Holy guacamole!</strong> A user was successfully created!
            <Link to="/users/new"> Add another one!</Link>
          </AlertContainer>
        )}
        {search === "?userDeleted=true" && (
          <AlertContainer
            show={this.state.showUserDeletedAlert}
            bsStyle="info"
            name="UserDeletedAlert"
            onDismiss={this.handleDismiss}
          >
            <strong>Woah!</strong> A user was successfully deleted.
          </AlertContainer>
        )}
        {this.state.users.length === 0 && (
          <AlertContainer
            show={this.state.showNoUsersAlert}
            bsStyle="warning"
            name="NoUsersAlert"
            onDismiss={this.handleDismiss}
          >
            <strong>Holy guacamole! </strong>There's are currently no users in
            the system. <Link to="/users/new">Add one!</Link>
          </AlertContainer>
        )}

        {/* USERS */}
        {this.state.fetchingUsers && (
          <h3>
            <Image
              responsive
              className="center-block"
              alt="loading spinner"
              src="/spin.svg"
            />
          </h3>
        )}
        {!this.state.fetchingUsers &&
          this.state.users.map(user => (
            <RenderUser
              key={user.email}
              {...this.props}
              deleteUser={this.props.deleteUser}
              user={user}
            />
          ))}
      </div>
    );
  };
}

function AlertContainer(props) {
  // console.log(props);
  if (props.show) {
    return (
      <Alert
        bsStyle={props.bsSytle}
        onDismiss={() => props.onDismiss(props.name)}
      >
        {props.children}
      </Alert>
    );
  } else {
    return null;
  }
}
