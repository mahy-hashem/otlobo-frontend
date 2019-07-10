import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.scss";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar__container">
        <div className="navbar__logo">
          <NavLink to="/" className="fas fa-hamburger" />
        </div>
        <div className="navbar__navigation-links">
          <ul>{this.props.children}</ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
