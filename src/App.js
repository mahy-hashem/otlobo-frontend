import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import SignUp from "./components/SignUp";
import Restaurants from "./components/Restaurant";

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/restaurants" component={Restaurants} />
        </Switch>
      </div>
    );
  }
}

export default App;
