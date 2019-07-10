import React from "react";

import "./Breadcrumb.scss";

class Breadcrumb extends React.Component {
  render() {
    return <div className="breadcrumb-container">{this.props.children}</div>;
  }
}

export default Breadcrumb;
