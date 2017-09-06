import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageHeader, Alert } from "react-bootstrap";

import RenderUser from "./RenderUser";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userCreated: this.props.location.search === "?userCreated=true",
      userDeleted: this.props.location.search === "?userDeleted=true"
    };
    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get("/api/users").then(({ data: { status, data } }) => {
      if (status === "OK") {
        return this.setState({
          users: data,
          userCreated: false
        });
      }
    });
  }

  deleteUser(e) {
    axios
      .delete(`/api/users/${e.target.dataset.email}`)
      .then(({ data: { status } }) => {
        if (status === "OK") {
          this.getUsers();
          this.setState({ ...this.state, userDeleted: true });
        }
      });
  }

  render() {
    return (
      <div>
        <PageHeader>Redis Users</PageHeader>
        {this.state.userCreated &&
          <Alert bsStyle="success">
            <strong>Holy guacamole!</strong> A user was successfully created!
            <Link to="/users/new"> Add another one!</Link>
          </Alert>}
        {this.state.userDeleted &&
          <Alert bsStyle="info">
            <strong>Woah!</strong> A user was successfully deleted.
          </Alert>}
        {this.state.users.length === 0 &&
          <Alert bsStyle="warning">
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
  }
}
