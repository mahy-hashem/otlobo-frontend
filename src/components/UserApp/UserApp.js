import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserLandingPage from "../LandingPages/LandingPageUser/LandingPage";
import Restaurants from "../Restaurants/Restaurants";

class UserApp extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header user={this.props.user} logout={this.props.logout} />
        <Switch>
          <Route
            path={`${this.props.match.url}/restaurants`}
            component={Restaurants}
          />
          <Route
            path={`${this.props.match.url}/userIndex`}
            render={props => (
              <UserLandingPage {...props} logout={this.props.logout} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(UserApp);
