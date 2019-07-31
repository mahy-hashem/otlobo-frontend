import React from "react";
import { withRouter } from "react-router-dom";
//import { NavLink } from "react-router-dom";

import "./NavBar.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class NavBar extends React.Component {
  // logout = () => {
  //   console.log("cleaaar");

  //   localStorage.clear();
  //   this.props.setLoggedUser();
  //   this.props.history.push("/");
  // };

  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="ml-auto"
        />
        <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
          <Nav className="ml-auto">
            {this.props.user && this.props.user.userType === "user" && (
              <React.Fragment>
                <li className="ml-auto">
                  <Nav.Link className="custom-link" href="/userApp/restaurants">
                    All Restaurants
                  </Nav.Link>
                </li>
                <li className="ml-auto">
                  <Nav.Link
                    className="custom-link"
                    href="/userApp/active-groups"
                  >
                    Active Groups
                  </Nav.Link>
                </li>
                <li className="ml-auto">
                  <Nav.Link
                    className="custom-link"
                    href={`/userApp/user-orders/${this.props.user.userId}`}
                  >
                    My Orders
                  </Nav.Link>
                </li>
                <li className="logOut ml-auto">
                  <FontAwesomeIcon
                    onClick={this.props.logout}
                    icon={faSignOutAlt}
                    color="grey"
                    size="lg"
                  >
                    Logout
                  </FontAwesomeIcon>
                </li>
              </React.Fragment>
            )}
            {this.props.user && this.props.user.userType === "restaurant" && (
              <React.Fragment>
                <li className="ml-auto">
                  <Nav.Link
                    className="custom-link"
                    href={`/app/menu/${this.props.user.userId}`}
                  >
                    My Menu
                  </Nav.Link>
                </li>
                <li className="ml-auto">
                  <Nav.Link
                    className="custom-link"
                    href={`/app/restaurant-orders/${this.props.user.userId}`}
                  >
                    My Orders
                  </Nav.Link>
                </li>
                <li className="ml-auto">
                  <Nav.Link className="custom-link" href="/profile">
                    My Profile
                  </Nav.Link>
                </li>
                <li className="logOut ml-auto">
                  <FontAwesomeIcon
                    onClick={this.props.logout}
                    icon={faSignOutAlt}
                    color="grey"
                    size="lg"
                  >
                    Logout
                  </FontAwesomeIcon>
                </li>
              </React.Fragment>
            )}
            {!this.props.user && (
              <React.Fragment>
                <li className="ml-auto">
                  <Nav.Link className="custom-link" href="signup">
                    Sign Up
                  </Nav.Link>
                </li>
                <li className="ml-auto">
                  <Nav.Link className="custom-link" href="login">
                    Login
                  </Nav.Link>
                </li>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
