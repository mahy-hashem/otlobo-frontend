import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./LandingPage.scss";

class LandingPage extends React.Component {
  state = {
    restaurantId: "",
    userName: ""
  };

  componentDidMount() {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    const restaurantId = JSON.parse(localStorage.getItem("userId"));
    const userName = restaurant ? restaurant.name : "Restaurant";
    this.setState({
      restaurantId,
      userName
    });
  }

  render() {
    return (
      <div className="restlandingPage">
        <div className="restlandingContainer">
          <div className="restlandingContainer__content">
            <div className="logoutIcon">
              <FontAwesomeIcon
                onClick={this.props.logout}
                icon={faSignOutAlt}
                color="white"
                size="3x"
              />
            </div>
            <h2 className="restlandingContainer__content__h2">
              Welcome, {this.state.userName}
            </h2>
            <div className="restlandingContainer__content__div">
              <p className="restlandingContainer__content__p">
                Would you like to see your menu?
              </p>
              <Link
                to={`/app/menu/${this.state.restaurantId}`}
                className="restlandingContainer__content__link restlandingContainer__content--btn"
              >
                take me to my menu
              </Link>
            </div>

            <div className="restlandingContainer__content__div">
              <p className="restlandingContainer__content__p">
                Would you like to see your orders?
              </p>
              <Link
                to={`/app/restaurant-orders/${this.state.restaurantId}`}
                className="restlandingContainer__content__link restlandingContainer__content--btn"
              >
                take me to my orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
