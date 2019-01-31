import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, InputGroup, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import RenderUser from './RenderUser';

export default class UsersSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      user: null,
      loading: false,
      errorMessage: '',
    };
  }

  handleChange = e => this.setState({ searchTerm: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true,
      user: null,
      errorMessage: '',
    });
    setTimeout(
      () =>
        axios.get(`/api/users/${this.state.searchTerm}`).then(({ data: { data: user } }) => {
          this.setState((prevState, props) => ({
            user: user ? user : prevState.user,
            errorMessage: user
              ? prevState.errorMessage
              : `No user with email address ${prevState.searchTerm} exists in the system. Please try again with a different email address.`,
            searchTerm: '',
            loading: false,
          }));
        }),
      500
    );
  };

  render() {
    return (
      <div>
        <h1>Search Users</h1>
        {this.state.errorMessage && (
          <Alert bsStyle="warning">
            <strong>Holy guacamole! </strong>
            {this.state.errorMessage}
          </Alert>
        )}
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputGroup.Prepend><InputGroup.Text>&#128269;</InputGroup.Text></InputGroup.Prepend>
            <FormControl type="text" onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search via email address" />
            <InputGroup.Append>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <h3>{this.state.loading && <Image responsive className="center-block" alt="loading spinner" src="/Spin.svg" />}</h3>
        {this.state.user && <RenderUser {...this.props} user={this.state.user} />}
      </div>
    );
  }
}
