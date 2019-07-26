import React from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import logo from "./logo.jpg";
import "./Header.scss";

class Header extends React.Component {
  render() {
    return (
      <header className="page-header">
        <div>
          <img src={logo} alt="Logo" />
          <h1>tlobo</h1>
        </div>
        <div>
          <NavBar
            logged={this.props.logged}
            userType={this.props.userType}
            userId={this.props.userId}
            setLoggedUser={this.props.setLoggedUser}
          >
            {this.props.children}
          </NavBar>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
