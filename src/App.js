import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import Restaurants from "./components/Restaurants/Restaurants";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage/RestaurantDetailsPage";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/restaurants" component={Restaurants} />
          <Route
            path="/restaurant/:restaurantId"
            component={RestaurantDetailsPage}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
