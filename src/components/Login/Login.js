import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DivWithErrorHandling from "../ErrorMessage/ErrorMessage";
import { saveToLocalStorage } from "../../util/localStorage";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    showError: false,
    errorMessage: ""
  };

  showErrorMessage = message => {
    this.setState({
      showError: true,
      errorMessage: message
    });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  sendRequest = userType => {
    const { email, password } = this.state;
    const url = process.env.REACT_APP_URL;
    axios
      .post(`${url}/login?userType=${userType}`, {
        email,
        password
      })
      .then(response => {
        console.log(response);
        localStorage.clear();
        saveToLocalStorage("token", response.data.token);
        saveToLocalStorage("userId", response.data.userId);
        saveToLocalStorage("userType", userType);
        userType === "user"
          ? saveToLocalStorage("user", response.data.user)
          : saveToLocalStorage("restaurant", response.data.restaurant);

        const userId = response.data.userId;
        if (userType === "user") {
          this.props.setLoggedUser({ userId, userType: "user" });
          this.props.history.push(`/userApp/userIndex`);
        } else {
          this.props.setLoggedUser({ userId, userType: "restaurant" });
          this.props.history.push(`/app/restaurantIndex`);
        }
      })
      .catch(error => {
        this.showErrorMessage("Email or password is incorrect");
      });
  };

  userLogin = event => {
    event.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      this.showErrorMessage("Please enter required fields");
      return;
    }

    this.sendRequest("user");
    console.log("logging as a user");
  };

  restaurantLogin = event => {
    event.preventDefault();

    if (this.state.email === "" || this.state.password === "") {
      this.showErrorMessage("Please enter required fields");
      return;
    }

    this.sendRequest("restaurant");
    console.log("logging as a restaurant");
  };

  render() {
    return (
      <div className="form-container">
        <DivWithErrorHandling
          showError={this.state.showError}
          errorMessage={this.state.errorMessage}
        >
          <Form>
            <fieldset>
              <legend>Login</legend>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button
                className="customColor center"
                type="submit"
                onClick={this.userLogin}
              >
                Login as a user
              </Button>
              <Button
                className="customColor center"
                type="submit"
                onClick={this.restaurantLogin}
              >
                Login as a restaurant
              </Button>
            </fieldset>
          </Form>
          <p>
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </DivWithErrorHandling>
      </div>
    );
  }
}

export default withRouter(Login);
