import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import SignUp from "./components/SignUp";
import Restaurants from "./components/Restaurants";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signUp" component={SignUp} />
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
