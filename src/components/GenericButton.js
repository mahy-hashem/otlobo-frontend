import React from "react";

import "./GenericButton.scss";

class GenericButton extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <button onClick={this.props.onClick}>{this.props.content}</button>
      </div>
    );
  }
}

export default GenericButton;
