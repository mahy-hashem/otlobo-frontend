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
    password: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleForm = event => {
    event.preventDefault();
    const url = process.env.REACT_APP_URL;
    console.log(url);
    axios
      .post(`${url}/signup?userType=restaurant`, this.state)
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
      >
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter restaurant's name"
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formGroupAddress">
          <Form.Label>Address</Form.Label>
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
