import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect(eventKey, e) {
    this.props.history.push(e.target.pathname);
  }

  render() {
    return (
      <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleOnSelect}>
        <NavItem href="/" eventKey={1}>
          Search
        </NavItem>
        <NavItem href="/users" eventKey={2}>
          All Users
        </NavItem>
      </Nav>
    );
  }
}
