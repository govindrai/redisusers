import React, { Component } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
          return (
            <ListGroup key={user.email}>
              <ListGroupItem>
                Name: {`${user.first_name} ${user.last_name}`}
              </ListGroupItem>
              <ListGroupItem>
                Email: {user.email}
              </ListGroupItem>
              <ListGroupItem>
                Phone: {user.phone}
              </ListGroupItem>
            </ListGroup>
          );
        })}
      </div>
    );
  }
}
