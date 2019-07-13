import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "./logo.png";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="page-header">
        <img src={logo} alt="Logo" />
        <h1>Otlobo</h1>
        <div className="links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
