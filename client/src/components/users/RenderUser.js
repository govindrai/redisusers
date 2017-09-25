import React, { Component } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default class RenderUser extends Component {
  deleteUser = e => {
    const { email } = e.target.dataset;
    axios.delete(`/api/users/${email}`).then(({ data: { status } }) => {
      if (status === "OK") {
        this.props.history.push({
          pathname: "/",
          state: { userDeleted: true, email }
        });
        this.props.startFetchingUsers();
        this.props.fetchUsers();
      }
    });
  };

  render() {
    const { user } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      <ListGroup key={user.email}>
        <ListGroupItem>Name: {fullName}</ListGroupItem>
        <ListGroupItem>Email: {user.email}</ListGroupItem>
        <ListGroupItem>Phone: {user.phone}</ListGroupItem>
        <ListGroupItem>
          <Button
            onClick={this.deleteUser}
            data-email={user.email}
            bsStyle="primary"
          >
            Delete User
          </Button>
        </ListGroupItem>
      </ListGroup>
    );
  }
}
