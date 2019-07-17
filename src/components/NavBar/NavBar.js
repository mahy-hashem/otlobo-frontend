import React from "react";
//import { NavLink } from "react-router-dom";

import "./NavBar.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            {this.props.logged && this.props.userType === "user" && (
              <React.Fragment>
                <li>
                  <Nav.Link href="/restaurants">All Restaurants</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/active-groups">Active Groups</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/users/:id">My Account</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/logout/:id">Logout</Nav.Link>
                </li>
              </React.Fragment>
            )}
            {this.props.logged && this.props.userType === "restaurant" && (
              <React.Fragment>
                <li>
                  <Nav.Link href="/restaurants/:id/menu-items">
                    My Menu
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/orders/:id">My Orders</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/restaurants/:id">Settings</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/logout/:id">Logout</Nav.Link>
                </li>
              </React.Fragment>
            )}
            {this.props.logged === false && (
              <React.Fragment>
                <li>
                  <Nav.Link href="signup">Sign Up</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="login">Login</Nav.Link>
                </li>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
