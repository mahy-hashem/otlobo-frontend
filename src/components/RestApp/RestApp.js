import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import RestLandingPage from "../LandingPages/LandingPageRestaurant/LandingPage";
import RestaurantDetailsPage from "../RestaurantDetailsPage/RestaurantDetailsPage";

import MenuItemForm from "../MenuItemForm/MenuItemForm";

class RestApp extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header user={this.props.user} logout={this.props.logout} />
        <Switch>
          <Route
            path={`${this.props.match.url}/menu/:restaurantId`}
            component={RestaurantDetailsPage}
          />
          <Route
            path={`${this.props.match.url}/restaurantIndex`}
            render={props => (
              <RestLandingPage {...props} logout={this.props.logout} />
            )}
          />
          <Route
            path={`${this.props.match.url}/menu-item-form`}
            component={MenuItemForm}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(RestApp);
