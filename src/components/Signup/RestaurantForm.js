import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import BaseForm from "./BaseForm";

class RestaurantForm extends React.Component {
  state = {
    name: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleForm = event => {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.address === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      this.props.showErrorMessage("Please enter required fields");
      return;
    }

    // if (this.state.password !== this.state.confirmPassword) {
    //   this.props.showErrorMessage(
    //     "Passwords don't match! Please re-enter your password"
    //   );
    //   return;
    // }
    const url = process.env.REACT_APP_URL;
    const { name, address, email, password } = this.state;
    axios
      .post(`${url}/signup?userType=restaurant`, {
        name,
        address,
        email,
        password
      })
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        this.props.showErrorMessage("This account already exists");
        //error.data.msg
      });
    console.log("handle restaurant form");
  };

  render() {
    return (
      <BaseForm
        inputChangeHandler={this.handleInputChange}
        formHandler={this.handleForm}
        userType="restaurant"
      >
        <Form.Group controlId="formGroupName">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter restaurant's name"
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupAddress">
          <Form.Label>Address *</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Enter restaurant's address"
            onChange={this.handleInputChange}
          />
        </Form.Group>
      </BaseForm>
    );
  }
}

export default withRouter(RestaurantForm);
