import React from 'react';
// import { Nav, Navbar } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand fontSize="45px" href="/">Redis Users</Navbar.Brand>
      </LinkContainer>
      <Nav className="justify-content-end">
        <LinkContainer exact to="/">
          <Nav.Link>All Users</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/users/search">
          <Nav.Link>Search Users</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/users/new">
          <Nav.Link>Add User</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}
