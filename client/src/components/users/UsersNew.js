import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert, Form } from 'react-bootstrap';
import axios from 'axios';

export default class UsersNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
      },
      errorMessage: '',
    };
  }

  handleOnChange = e => {
    let newState = { ...this.state };
    newState.user[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleOnSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/users', this.state.user)
      .then(({ data: { status, message: errorMessage } }) => {
        if (status === 'OK') {
          // this.props.showUserCreatedAlert();
          this.props.history.push({
            pathname: '/',
            state: { userCreated: true, email: this.state.user.email },
          });
        } else {
          if (status === 'EXISTING_EMAIL') {
            this.setState({
              errorMessage: `An entry with email address ${
                this.state.user.email
              } already exists in the system. Please try again with a different email.`,
            });
          } else {
            this.setState({ errorMessage });
          }
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    console.log(Form.Label);
    return (
      <div>
        {this.state.errorMessage && (
          <Alert bsStyle="danger">
            <h4>Oh snap! You got an error!</h4>
            <p>{this.state.errorMessage}</p>
          </Alert>
        )}
        <h1>Add User</h1>
        <Form onSubmit={this.handleOnSubmit} action="/api/users" method="post">
          <FormGroup>
            <Form.Label>First Name</Form.Label>
            <FormControl type="text" onChange={this.handleOnChange} name="first_name" value={this.state.first_name} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Last Name</Form.Label>
            <FormControl type="text" onChange={this.handleOnChange} name="last_name" value={this.state.last_name} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Email</Form.Label>
            <FormControl type="text" onChange={this.handleOnChange} name="email" value={this.state.email} />
          </FormGroup>
          <FormGroup>
            <Form.Label>Phone</Form.Label>
            <FormControl type="text" onChange={this.handleOnChange} name="phone" value={this.state.phone} />
          </FormGroup>
          <Button type="submit">
            Create User
          </Button>
        </Form>
      </div>
    );
  }
}
