import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function RenderUser(user) {
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
}
