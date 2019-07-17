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
          <h1>Otlobo</h1>
        </div>
        <div>
          <NavBar logged={this.props.logged} userType={this.props.userType}>
            {this.props.children}
          </NavBar>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
