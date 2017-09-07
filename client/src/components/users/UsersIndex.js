import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageHeader, Alert } from "react-bootstrap";

import RenderUser from "./RenderUser";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true,
      showUserCreatedAlert: true,
      showUserDeletedAlert: true,
      showNoUsersAlert: true,
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get("/api/users").then(({ data: { status, data } }) => {
      if (status === "OK") {
        return this.setState({
          users: data,
          pageLoading: false
        });
      }
    });
  };

  deleteUser = e => {
    axios
      .delete(`/api/users/${e.target.dataset.email}`)
      .then(({ data: { status } }) => {
        if (status === "OK") {
          this.getUsers();
        }
      });
  };

  handleDismiss = alertName => {
    this.setState({ ["show" + alertName]: false });
  };

  render = () => {
    console.log("index just rendered");
    if (this.state.pageLoading) return null;
    const { search } = this.props.location;
    return (
      <div>
        <PageHeader>Redis Users</PageHeader>
        {search === "?userCreated=true" &&
          <AlertContainer
            show={this.state.showUserCreatedAlert}
            name="UserCreatedAlert"
            bsStyle="success"
            onDismiss={this.handleDismiss}
          >
            <strong>Holy guacamole!</strong> A user was successfully created!
            <Link to="/users/new"> Add another one!</Link>
          </AlertContainer>}
        {search === "?userDeleted=true" &&
          <Alert bsStyle="info" onDismiss={this.handleAlertDismiss}>
            <strong>Woah!</strong> A user was successfully deleted.
          </Alert>}
        {this.state.users.length === 0 &&
          <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
            <strong>Holy guacamole!</strong> There's are currently no users in
            the system. <Link to="/users/new">Add one!</Link>
          </Alert>}
        {this.state.users.map(user =>
          <RenderUser
            key={user.email}
            {...this.props}
            deleteUser={this.deleteUser}
            user={user}
          />
        )}
      </div>
    );
  };
}

function AlertContainer(props) {
  console.log(props);
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
// search === "?userCreated=true" && this.
