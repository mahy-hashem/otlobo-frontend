import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./SignUp.scss";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import UserForm from "./UserForm";
import RestaurantForm from "./RestaurantForm";
import DivWithErrorHandling from "../../components/ErrorMessage/ErrorMessage";

import Header from "../Header/Header";
import Nav from "react-bootstrap/Nav";

class SignUp extends React.Component {
  state = {
    showError: false,
    errorMessage: ""
  };

  showErrorMessage = message => {
    this.setState({
      showError: true,
      errorMessage: message
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header>
          <li>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </li>
          <li>
            <Nav.Link href="/login">Login</Nav.Link>
          </li>
          <li>
            <Nav.Link href="/restaurants">All Restaurants</Nav.Link>
          </li>
          <li />
        </Header>
        <div className="signup-container">
          <DivWithErrorHandling
            showError={this.state.showError}
            errorMessage={this.state.errorMessage}
          >
            <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
              <Tab eventKey="user" title="User">
                <UserForm showErrorMessage={this.showErrorMessage} />
              </Tab>
              <Tab eventKey="restaurant" title="Restaurant">
                <RestaurantForm showErrorMessage={this.showErrorMessage} />
              </Tab>
            </Tabs>
            <p>
              Already have an account? <Link to="/login">login</Link>
            </p>
          </DivWithErrorHandling>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignUp);
