import React, { Component } from "react";
import axios from "axios";

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("/api/users").then(res => console.log(res));
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user => {
          return (
            <li key={user.email}>
              {user.first_name}
            </li>
          );
        })}
      </ul>
    );
  }
}
