import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import logo from "../../images/logo.png";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="page-header">
        <div>
          <a href="/">
            <img src={logo} alt="Logo" />

            <h1>tlobo</h1>
          </a>
        </div>
        <div>
          <NavBar user={this.props.user} logout={this.props.logout}>
            {this.props.children}
          </NavBar>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
