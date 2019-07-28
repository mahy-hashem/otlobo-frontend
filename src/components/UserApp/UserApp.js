import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import UserLandingPage from "../LandingPages/LandingPageUser/LandingPage";

import RestaurantDetailsPage from "../RestaurantDetailsPage/RestaurantDetailsPage";
import Restaurants from "../Restaurants/Restaurants";
import Checkout from "../Checkout/Checkout";

import GroupOrderSummary from "../GroupOrderSummary/GroupOrderSummary";
import SingleGroup from "../SingleGroup/SingleGroup";
import ActiveGroups from "../ActiveGroups/ActiveGroups";
import UserOrders from "../UserOrders/UserOrders";

class UserApp extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header user={this.props.user} logout={this.props.logout} />
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}/active-groups/:groupId`}
            component={SingleGroup}
          />

          <Route
            exact
            path={`${this.props.match.url}/active-groups`}
            component={ActiveGroups}
          />
          <Route
            exact
            path={`${
              this.props.match.url
            }/restaurant/:restaurantId/checkout/success`}
            component={GroupOrderSummary}
          />
          <Route
            exact
            path={`${this.props.match.url}/restaurant/:restaurantId/checkout`}
            component={Checkout}
          />
          <Route
            path={`${this.props.match.url}/restaurants`}
            component={Restaurants}
          />
          <Route
            path={`${this.props.match.url}/restaurant/:restaurantId`}
            component={RestaurantDetailsPage}
          />
          <Route
            path={`${this.props.match.url}/user-orders/:userId`}
            component={UserOrders}
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
