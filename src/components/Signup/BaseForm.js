import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class BaseForm extends React.Component {
  render() {
    return (
      <Form>
        <fieldset>
          <legend>Create an account</legend>
          {this.props.children}
          <Form.Group controlId={`formGroupEmail${this.props.userType}`}>
            <Form.Label>Email address *</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={this.props.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId={`formGroupPassword${this.props.userType}`}>
            <Form.Label>Password *</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.props.inputChangeHandler}
            />
          </Form.Group>
          <Form.Group
            controlId={`formGroupConfirmPassword${this.props.userType}`}
          >
            <Form.Label>Confirm Password *</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={this.props.inputChangeHandler}
            />
          </Form.Group>
          <Button
            className="customColor"
            onClick={this.props.formHandler}
            type="submit"
          >
            Create an account
          </Button>
        </fieldset>
      </Form>
    );
  }
}

export default BaseForm;
