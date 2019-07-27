import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import BaseForm from "./BaseForm";

import { saveToLocalStorage } from "../../util/localStorage";

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
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.props.showErrorMessage("Please enter required fields");
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.props.showErrorMessage(
        "Passwords don't match! Please re-enter your password"
      );
      return;
    }

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
        localStorage.clear();
        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("userId", response.data.userId);
        saveToLocalStorage("userType", "restaurant");
        saveToLocalStorage("restaurant", response.data.restaurant);

        const userId = response.data.userId;
        this.props.setLoggedUser({ userId, userType: "restaurant" });
        this.props.history.push("/app/restaurantIndex");
      })
      .catch(error => {
        this.props.showErrorMessage("This account already exists");
      });
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
