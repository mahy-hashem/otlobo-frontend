import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./SignUp.scss";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import UserForm from "./UserForm";
import RestaurantForm from "./RestaurantForm";
import DivWithErrorHandling from "../../components/ErrorMessage/ErrorMessage";

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

  hideErrorMessage = message => {
    this.setState({
      showError: false,
      errorMessage: ""
    });
  };

  render() {
    return (
      <div className="form-container">
        <DivWithErrorHandling
          showError={this.state.showError}
          errorMessage={this.state.errorMessage}
        >
          <Tabs defaultActiveKey="user" id="uncontrolled-tab-example">
            <Tab eventKey="user" title="User">
              <UserForm
                {...this.props}
                showErrorMessage={this.showErrorMessage}
              />
            </Tab>
            <Tab eventKey="restaurant" title="Restaurant">
              <RestaurantForm
                {...this.props}
                showErrorMessage={this.showErrorMessage}
              />
            </Tab>
          </Tabs>
          <p>
            Already have an account? <Link to="/login">login</Link>
          </p>
        </DivWithErrorHandling>
      </div>
    );
  }
}

export default withRouter(SignUp);
