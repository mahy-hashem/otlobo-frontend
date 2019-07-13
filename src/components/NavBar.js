import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Otlobo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-auto">
          <Nav className="mx-auto">{this.props.children}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
