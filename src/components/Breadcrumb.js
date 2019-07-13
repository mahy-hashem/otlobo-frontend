import React from "react";

import BreadCrumb from "react-bootstrap/Breadcrumb";
import "./Breadcrumb.scss";

class Breadcrumb extends React.Component {
  render() {
    return <BreadCrumb>{this.props.children}</BreadCrumb>;
  }
}

export default Breadcrumb;
