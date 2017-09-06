import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  PageHeader,
  Alert
} from "react-bootstrap";
import axios from "axios";

export default class UsersNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
      },
      errorMessage: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    let newState = { ...this.state };
    newState.user[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/users", this.state.user)
      .then(({ data: { status, message } }) => {
        if (status === "OK") {
          this.props.history.push("/?userCreated=true");
        } else {
          this.setState({
            ...this.state,
            errorMessage: `An entry with email address ${this.state.user
              .email} already exists in the system. Please try again with a different email.`
          });
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    let ErrorComponent;
    if (this.state.errorMessage) {
      ErrorComponent = (
        <Alert bsStyle="danger">
          <h4>Oh snap! You got an error!</h4>
          <p>
            {this.state.errorMessage}
          </p>
        </Alert>
      );
    }

    return (
      <div>
        {ErrorComponent}
        <PageHeader>Add User</PageHeader>
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
