import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./SignUp.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class SignUp extends React.Component {
  render() {
    return (
      <div className="signup-container">
        <Form>
          <fieldset>
            <legend>Create an account</legend>
            <div className="signup-container__type">
              <input type="radio" id="user" name="type" />
              <label htmlFor="user">I am a user</label>
              <input type="radio" id="restaurant" name="type" />
              <label htmlFor="restaurant">I am a restaurant</label>
            </div>
            <Form.Group controlId="formGroupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                placeholder="Enter first name"
              />
            </Form.Group>
            <Form.Group controlId="formGroupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button variant="primary">Create Account</Button>
          </fieldset>
        </Form>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(SignUp);
