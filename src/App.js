import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Restaurants from "./components/Restaurants/Restaurants";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage/RestaurantDetailsPage";
import MenuItem from "./components/RestaurantDetailsPage/MenuItem";
import MenuItemForm from "./components/MenuItemForm/MenuItemForm";

import { getLocalStorageItem } from "./util/localStorage";
import "./App.css";
class App extends React.Component {
  state = {
    logged: false,
    userType: ""
  };

  setLoggedUser = () => {
    const authorizedUser = getLocalStorageItem("token");
    if (authorizedUser) {
      const userType = getLocalStorageItem("userType");
      this.setState({
        logged: true,
        userType
      });
    }
  };

  // requireAuth = (nextState, replace, next) => {
  //   if (!this.state.logged) {
  //     replace({
  //       pathname: "/login",
  //       state: { nextPathname: nextState.location.pathname }
  //     });
  //   }
  //   next();
  // };

  componentDidMount() {
    this.setLoggedUser();
  }

  render() {
    return (
      <div className="app-container">
        <Header logged={this.state.logged} userType={this.state.userType} />
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} setLoggedUser={this.setLoggedUser} />
            )}
          />
          <Route
            path="/restaurants"
            component={Restaurants}
            //  onEnter={this.requireAuth}
          />
          <Route
            path="/restaurant/:restaurantId"
            component={RestaurantDetailsPage}
          />
          <Route path="/menu-item-form" component={MenuItemForm} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
