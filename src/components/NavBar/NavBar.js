import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mx-auto">
          <Nav className="mx-auto">
            {this.props.logged && this.props.userType === "user" && (
              <ul>
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
              </ul>
            )}
            {this.props.logged && this.props.userType === "restaurant" && (
              <ul>
                <li>
                  <Nav.Link href="/orders/:id">Orders</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/restaurants/:id/menu-items">
                    My Menu
                  </Nav.Link>
                </li>
                <Nav.Link>
                  <Nav.Link href="/restaurants/:id">Profile</Nav.Link>
                </Nav.Link>
                <li>
                  <Nav.Link href="/logout/:id">Logout</Nav.Link>
                </li>
              </ul>
            )}
            {this.props.logged === false && (
              <ul>
                <li>
                  <Nav.Link href="signup">Sign Up</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="login">Login</Nav.Link>
                </li>
              </ul>
            )}
            {this.props.children}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
