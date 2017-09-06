import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default class RenderUser extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    this.props.deleteUser(e);
  }

  render() {
    const { user } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`;
    return (
      <ListGroup key={user.email}>
        <ListGroupItem>
          Name: {fullName}
        </ListGroupItem>
        <ListGroupItem>
          Email: {user.email}
        </ListGroupItem>
        <ListGroupItem>
          Phone: {user.phone}
        </ListGroupItem>
        <ListGroupItem>
          <Button
            onClick={this.handleOnClick}
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
