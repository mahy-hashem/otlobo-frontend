import React from "react";
import { Link } from "react-router-dom";

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
            <h2 className="restlandingContainer__content__h2">
              Welcome, {this.state.userName}
            </h2>
            <div className="restlandingContainer__content__div">
              <p className="restlandingContainer__content__p">
                would you like to add something new to your menu today?
              </p>
              <Link
                to={`/restaurant/${this.state.restaurantId}`}
                className="restlandingContainer__content__link restlandingContainer__content--btn"
              >
                take me to my menu
              </Link>
            </div>

            <div className="restlandingContainer__content__div">
              <p className="restlandingContainer__content__p">
                would you like to update your profile information?
              </p>
              <Link
                to="/signup"
                className="restlandingContainer__content__link restlandingContainer__content--btn"
              >
                take me to my profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
