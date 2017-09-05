import React, { Component } from "react";
import axios from "axios";

import RenderUser from "./RenderUser";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("/api/users").then(({ data: users }) => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <h1>Redis Users</h1>
        {this.state.users.map(user => {
          return RenderUser(user);
        })}
      </div>
    );
  }
}
