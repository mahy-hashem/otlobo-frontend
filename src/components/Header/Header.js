import React from "react";
import { withRouter, Link } from "react-router-dom";
//import Nav from "react-bootstrap/Nav";
import NavBar from "../NavBar/NavBar";
import logo from "./logo.png";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="page-header">
        <img src={logo} alt="Logo" />
        <h1>Otlobo</h1>
        <NavBar>{this.props.children}</NavBar>
      </header>
    );
  }
}

export default withRouter(Header);

{
  /* <div className="links">
  <Link to="/signup">Sign Up</Link>
  <Link to="/login">Login</Link>
</div> */
}
