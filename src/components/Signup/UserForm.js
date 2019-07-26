import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import BaseForm from "./BaseForm";

import { saveToLocalStorage } from "../../util/localStorage";

class UserForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
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
      this.state.firstName === "" ||
      this.state.lastName === "" ||
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
    const { firstName, lastName, email, password } = this.state;
    axios
      .post(`${url}/signup?userType=user`, {
        firstName,
        lastName,
        email,
        password
      })
      .then(response => {
        console.log(response);
        localStorage.clear();
        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("userId", response.data.userId);
        saveToLocalStorage("userType", "user");
        saveToLocalStorage("user", response.data.user);
        this.props.setLoggedUser();
        this.props.history.push("/userIndex");
      })
      .catch(error => {
        //this.props.showErrorMessage(error.message);
        this.props.showErrorMessage("This account already exists");
        console.log(error);
      });
    console.log("handle user form");
  };

  render() {
    return (
      <BaseForm
        inputChangeHandler={this.handleInputChange}
        formHandler={this.handleForm}
        userType="user"
      >
        <Form.Group controlId="formGroupFirstName">
          <Form.Label>First Name *</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupLastName">
          <Form.Label>Last Name *</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Enter last name"
            onChange={this.handleInputChange}
          />
        </Form.Group>
      </BaseForm>
    );
  }
}

export default withRouter(UserForm);
