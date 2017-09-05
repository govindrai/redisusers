import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  Button,
  PageHeader,
  InputGroup,
  Image,
  Row
} from "react-bootstrap";
import axios from "axios";

import RenderUser from "./RenderUser";

export default class UsersSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      user: null,
      loadingMessage: ""
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
    this.setState({ ...self.state, loadingMessage: "loading...", user: null });
    setTimeout(
      () =>
        axios
          .get(`/api/users/${self.state.searchTerm}`)
          .then(({ data: user }) =>
            self.setState({ user, searchTerm: "", loadingMessage: "" })
          ),
      1000
    );
  }

  render() {
    return (
      <div>
        <PageHeader>
          User Search <small>Email Address Search</small>
        </PageHeader>
        <form onSubmit={this.handleOnSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                onChange={this.handleOnChange}
                value={this.state.searchTerm}
              />
              <InputGroup.Button>
                <Button type="submit">Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <h3>
          {this.state.loadingMessage &&
            <Row>
              <Image
                responsive
                className="center-block"
                alt="loading spinner"
                src="/spin.svg"
              />
            </Row>}
        </h3>
        {this.state.user && RenderUser(this.state.user)}
      </div>
    );
  }
}
