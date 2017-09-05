import React, { Component } from "react";
import { FormGroup, FormControl, Button, Form } from "react-bootstrap";

export default class UsersSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <FormControl type="text" />
        </FormGroup>
        <Button type="submit">Search</Button>
      </Form>
    );
  }
}
