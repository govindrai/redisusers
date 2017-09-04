import React, { Component } from "react";

export default class UsersNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone: ""
    };
  }
  handleOnChange(e) {
    console.log(Object.assign({ [e.target.name]: e.target.value }, this.state));
    // this.state = Object.assign({[e.target.name]: e.target.value}, this.state);
  }

  render() {
    return (
      <form action="/users" method="post">
        <input type="text" onChange={this.handleOnChange} name="first_name" />
        <input type="text" onChange={this.handleOnChange} name="last_name" />
        <input type="text" onChange={this.handleOnChange} name="email" />
        <input type="text" onChange={this.handleOnChange} name="phone" />
        <input type="submit" value="Create User" />
      </form>
    );
  }
}
