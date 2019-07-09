import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp"
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signUp" component={SignUp} />
        </Switch>
      </div>
    )
  }
}

export default App;
