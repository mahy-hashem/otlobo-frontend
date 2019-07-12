import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
//import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
