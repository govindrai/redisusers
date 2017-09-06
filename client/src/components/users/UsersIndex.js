import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageHeader, Alert } from "react-bootstrap";

import RenderUser from "./RenderUser";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("/api/users").then(({ data: { status, data } }) => {
      if (status === "OK") {
        return this.setState({ users: data });
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeader>Redis Users</PageHeader>
        {this.state.users.length === 0 &&
          <Alert bsStyle="warning">
            <strong>Holy guacamole!</strong> There's are currently no users in
            the system. <Link to="/users/new">Add one!</Link>
          </Alert>}
        {this.state.users.map(user => RenderUser(user))}
      </div>
    );
  }
}
