import React from "react";
import defaultLogo from "../../images/restaurantProfileDefault.jpg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faKey } from "@fortawesome/free-solid-svg-icons";

import { getLocalStorageItem } from "../../util/localStorage";
import "./RestaurantProfile.scss";

class RestaurantProfile extends React.Component {
  state = {
    restaurant: {}
  };

  componentDidMount() {
    const restaurant = getLocalStorageItem("restaurant");
    console.log(restaurant.id);
    this.setState({
      restaurant
    });
  }

  render() {
    return (
      <div className="profileContainer">
        {this.state.restaurant.image ? (
          <div className="profilePicture">
            <img
              src={`${process.REACT_APP_URL}/${this.state.restaurant.image}`}
              alt="restaurant-logo"
            />
            <Link to={`/edit-profile`}>Edit your photo</Link>
          </div>
        ) : (
          <div className="profilePicture">
            <img src={defaultLogo} alt="default logo" />
            <Link to={`/edit-profile`}>Add your photo</Link>
          </div>
        )}
        <div className="restaurantInfo">
          <h1>{this.state.restaurant.name}</h1>
          <p>{this.state.restaurant.address}</p>
          {this.state.restaurant.mobile && (
            <p>{this.state.restaurant.mobile}</p>
          )}
        </div>
        <div className="actions">
          {/* <FontAwesomeIcon icon={faPencilAlt} size="lg" color="grey" />
          <FontAwesomeIcon icon={faKey} size="lg" color="grey" /> */}
          <Link to={`/edit-profile`}>Edit profile</Link>
          <Link to={`/edit-credentials`}>Edit credentials</Link>
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;
