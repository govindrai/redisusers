import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import axios from "axios";

export default class UsersNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/users", this.state)
      .then(res => {
        if (res.data === "OK") {
          this.props.history.push("/");
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <h1>Add User</h1>
        <form onSubmit={this.handleOnSubmit} action="/api/users" method="post">
          <FormGroup>
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleOnChange}
              name="first_name"
              value={this.state.first_name}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleOnChange}
              name="last_name"
              value={this.state.last_name}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleOnChange}
              name="email"
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleOnChange}
              name="phone"
              value={this.state.phone}
            />
          </FormGroup>
          <Button type="submit">Create User</Button>
        </form>
      </div>
    );
  }
}
