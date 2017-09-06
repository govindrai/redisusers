import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  Button,
  PageHeader,
  InputGroup,
  Image,
  Alert
} from "react-bootstrap";
import axios from "axios";

import RenderUser from "./RenderUser";

export default class UsersSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      user: null,
      loading: false,
      errorMessage: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const self = this;
    this.setState({
      ...self.state,
      loading: true,
      user: null,
      errorMessage: ""
    });
    setTimeout(
      () =>
        axios
          .get(`/api/users/${self.state.searchTerm}`)
          .then(({ data: { data: user } }) => {
            if (user) {
              self.setState({
                user,
                searchTerm: "",
                loading: false,
                errorMessage: ""
              });
            } else {
              self.setState({
                ...this.state,
                errorMessage: `No user with email address ${self.state
                  .searchTerm} exists in the system. Please try again with a different email address.`,
                searchTerm: "",
                loading: false
              });
            }
          }),
      500
    );
  }

  render() {
    return (
      <div>
        <PageHeader>Redis User Search</PageHeader>
        {this.state.errorMessage &&
          <Alert bsStyle="warning">
            <strong>Holy guacamole! </strong>
            {this.state.errorMessage}
          </Alert>}
        <form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <span
                  role="img"
                  aria-label="left-facing magnifying glass emoji"
                >
                  &#128269;
                </span>
              </InputGroup.Addon>
              <FormControl
                type="text"
                onChange={this.handleOnChange}
                value={this.state.searchTerm}
                placeholder="Search via email address"
              />
              <InputGroup.Button>
                <Button type="submit">Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <h3>
          {this.state.loading &&
            <Image
              responsive
              className="center-block"
              alt="loading spinner"
              src="/spin.svg"
            />}
        </h3>
        {this.state.user &&
          <RenderUser {...this.props} user={this.state.user} />}
      </div>
    );
  }
}
