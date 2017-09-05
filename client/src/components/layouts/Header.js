import React from "react";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
            <a>User Management via Redis</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer exact to="/">
            <NavItem>Search</NavItem>
          </LinkContainer>
          <LinkContainer to="/users">
            <NavItem>All Users</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
