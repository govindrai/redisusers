import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PageHeader, Alert, Image } from 'react-bootstrap';

import RenderUser from './RenderUser';

export default class UsersIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchingUsers: true,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  startFetchingUsers = () => {
    this.setState({ fetchingUsers: true });
  };

  fetchUsers = () => {
    setTimeout(
      () =>
        axios.get('/api/users').then(({ data: { status, data } }) => {
          if (status === 'OK') {
            return this.setState({
              users: data,
              fetchingUsers: false,
            });
          }
        }),
      1000
    );
  };

  handleDismiss = alertName => {
    this.props.history.replace('/', { [alertName]: false });
  };

  render = () => {
    return (
      <div>
        {/* PAGE HEADER */}
        <PageHeader>User Directory</PageHeader>

        {/* ALERTS */}
        {this.props.location.state && this.props.location.state.userCreated && (
          <AlertContainer bsStyle="success" name="userCreated" onDismiss={this.handleDismiss}>
            <strong>Success!</strong> User with email {this.props.location.state.email} was successfully created!
            <Link to="/users/new"> Add another one!</Link>
          </AlertContainer>
        )}
        {this.props.location.state && this.props.location.state.userDeleted && (
          <AlertContainer bsStyle="info" name="userDeleted" onDismiss={this.handleDismiss}>
            <strong>Woah!</strong> User with email {this.props.location.state.email} was successfully deleted.
          </AlertContainer>
        )}
        {!this.state.fetchingUsers && this.state.users.length === 0 && (
          <AlertContainer bsStyle="warning" name="noUsers">
            <strong>Holy guacamole! </strong>There's are currently no users in the system. <Link to="/users/new">Add one!</Link>
          </AlertContainer>
        )}

        {/* USERS */}
        {this.state.fetchingUsers && (
          <h3 style={{ textAlign: 'center' }}>
            <Image responsive className="center-block" alt="loading spinner" src="/Spin.svg" />
          </h3>
        )}
        {!this.state.fetchingUsers &&
          this.state.users.map(user => (
            <RenderUser
              key={user.email}
              fetchUsers={this.fetchUsers}
              startFetchingUsers={this.startFetchingUsers}
              user={user}
              {...this.props}
            />
          ))}
      </div>
    );
  };
}

function AlertContainer(props) {
  if (props.onDismiss) {
    return (
      <Alert bsStyle={props.bsStyle} onDismiss={() => props.onDismiss(props.name)}>
        {props.children}
      </Alert>
    );
  } else {
    return <Alert bsStyle={props.bsStyle}>{props.children}</Alert>;
  }
}
