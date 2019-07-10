import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends React.Component {
  render() {
    return (
      <div className="login-container">
        <Form>
          <fieldset>
            <legend>Login</legend>
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
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" className="center">
              Login
            </Button>
          </fieldset>
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
