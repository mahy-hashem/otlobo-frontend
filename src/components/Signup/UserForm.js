import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import BaseForm from "./BaseForm";

class UserForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleForm = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:3003/signup?userType=user`, this.state)
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        //this.props.showErrorMessage(error.message);
        this.props.showErrorMessage("This account already exists");
      });
    console.log("handle user form");
  };

  render() {
    return (
      <BaseForm
        inputChangeHandler={this.handleInputChange}
        formHandler={this.handleForm}
      >
        <Form.Group controlId="formGroupFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter first name"
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupLastName">
          <Form.Label>Last Name</Form.Label>
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
