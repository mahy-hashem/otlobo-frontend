import React from "react";
import { NavLink } from "react-router-dom";

class RestaurantCard extends React.Component {
  render() {
    return (
      <div>
        <NavLink to={`/restaurant/${this.props.id}`}>
          <h1>{this.props.name}</h1>
        </NavLink>
        <p>{this.props.address}</p>
      </div>
    );
  }
}

export default RestaurantCard;
