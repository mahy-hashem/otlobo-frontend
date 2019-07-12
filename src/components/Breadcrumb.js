import React from "react";

import BreadCrumb from "react-bootstrap/Breadcrumb";
import "./Breadcrumb.scss";

class Breadcrumb extends React.Component {
  render() {
    return (
      <BreadCrumb>
        <BreadCrumb.Item href="#">Home</BreadCrumb.Item>
        <BreadCrumb.Item href="#">Restaurants</BreadCrumb.Item>
      </BreadCrumb>
    );
  }
}

export default Breadcrumb;
