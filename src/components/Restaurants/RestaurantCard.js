import React from "react";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./RestaurantCard.scss";

class RestaurantCard extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem" }} className="restaurant-card mx-auto">
        <Card.Img variant="top" src={this.props.image} />
        <Card.Body>
          <NavLink to={`/userApp/restaurant/${this.props.id}`}>
            <Card.Title>{this.props.name}</Card.Title>
          </NavLink>
          <Card.Subtitle className="mb-2 text-muted">
            {this.props.address}
          </Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default RestaurantCard;
