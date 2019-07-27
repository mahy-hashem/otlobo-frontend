import React from "react";
import { NavLink } from "react-router-dom";
import "./RestaurantCard.scss";

class RestaurantCard extends React.Component {
  render() {
    return (
      <div className="cardContainer">
        <NavLink to={`/userApp/restaurant/${this.props.id}`}>
          <h1>{this.props.name}</h1>
        </NavLink>
        <p>{this.props.address}</p>
      </div>
    );
  }
}

export default RestaurantCard;
