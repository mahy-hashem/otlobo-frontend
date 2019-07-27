import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPages/MainLandingPage/LandingPage";
import UserLandingPage from "./components/LandingPages/LandingPageUser/LandingPage";
import RestLandingPage from "./components/LandingPages/LandingPageRestaurant/LandingPage";
import Restaurants from "./components/Restaurants/Restaurants";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage/RestaurantDetailsPage";
import MenuItem from "./components/RestaurantDetailsPage/MenuItem";
import MenuItemForm from "./components/MenuItemForm/MenuItemForm";
import Checkout from "./components/Checkout/Checkout";
import RestaurantProfile from "./components/RestaurantProfile/RestaurantProfile";
import EditRestaurantProfile from "./components/RestaurantProfile/EditRestaurantProfile";
import EditRestaurantCredentials from "./components/RestaurantProfile/EditRestaurantCredentials";
import ActiveGroups from "./components/ActiveGroups/ActiveGroups";
import GroupOrderSummary from "./components/GroupOrderSummary/GroupOrderSummary";
import SingleGroup from "./components/SingleGroup/SingleGroup";

import { getLocalStorageItem } from "./util/localStorage";
import RestaurantOrders from "./components/RestaurantOrders/RestaurantOrders";
import "./App.css";

class App extends React.Component {
  state = {
    logged: false,
    userType: "",
    userId: ""
  };

  componentDidMount() {
    this.setLoggedUser();
  }

  setLoggedUser = () => {
    const authorizedUser = getLocalStorageItem("token");
    if (authorizedUser) {
      const userType = getLocalStorageItem("userType");
      const userId = getLocalStorageItem("userId");
      this.setState({
        logged: true,
        userType,
        userId
      });
    } else {
      this.setState({
        logged: false,
        userType: "",
        userId: ""
      });
    }
  };

  render() {
    return (
      <div className="app-container">
        <Header
          logged={this.state.logged}
          userType={this.state.userType}
          setLoggedUser={this.setLoggedUser}
          userId={this.state.userId}
        />
        <Switch>
          <Route exact path="/active-groups/:groupId" component={SingleGroup} />

          <Route exact path="/active-groups" component={ActiveGroups} />

          <Route
            exact
            path="/restaurant/:restaurantId/checkout/success"
            component={GroupOrderSummary}
          />
          <Route
            exact
            path="/restaurant/:restaurantId/checkout"
            component={Checkout}
          />

          <Route
            path="/restaurant-orders/:resturantId"
            component={RestaurantOrders}
          />

          <PrivateRoute
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="user"
            path="/userIndex"
            component={UserLandingPage}
          />
          <PrivateRoute
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/restaurantIndex"
            component={RestLandingPage}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/profile"
            component={RestaurantProfile}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/edit-profile"
            component={EditRestaurantProfile}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/edit-credentials"
            component={EditRestaurantCredentials}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="user"
            path="/restaurants"
            component={Restaurants}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="user"
            path="/restaurant/:restaurantId"
            component={RestaurantDetailsPage}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/menu/:restaurantId"
            component={RestaurantDetailsPage}
          />
          <Route
            authed={this.state.logged}
            userType={this.state.userType}
            pageType="restaurant"
            path="/menu-item-form"
            component={MenuItemForm}
          />

          <Route exact path="/" component={LandingPage} />
          <Route
            path="/signup"
            render={props => (
              <SignUp {...props} setLoggedUser={this.setLoggedUser} />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login {...props} setLoggedUser={this.setLoggedUser} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const PrivateRoute = ({
  component: Component,
  authed,
  userType,
  pageType,
  ...rest
}) => {
  console.log(authed, userType, pageType);
  return (
    <Route
      {...rest}
      render={props =>
        authed === true && userType === pageType ? (
          <Component {...props} />
        ) : (
          // <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          <Component {...props} />
        )
      }
    />
  );
};

export default App;
