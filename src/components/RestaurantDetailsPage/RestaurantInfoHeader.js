import React from "react";

class RestaurantInfoHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.props.address}</p>
      </div>
    );
  }
}

export default RestaurantInfoHeader;
