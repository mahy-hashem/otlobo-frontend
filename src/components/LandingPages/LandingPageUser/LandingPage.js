import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./LandingPage.scss";

function LandingPage(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.firstName : "User";
  return (
    <div className="userlandingPage">
      <div className="restlandingContainer">
        <div className="restlandingContainer__content">
          <div className="logoutIcon">
            <FontAwesomeIcon
              onClick={props.logout}
              icon={faSignOutAlt}
              color="white"
              size="3x"
            />
          </div>
          <h2 className="restlandingContainer__content__h2">
            Welcome, {userName}
          </h2>
          <div className="restlandingContainer__content__div">
            <p className="restlandingContainer__content__p">
              what would you like to eat today?
            </p>
            <Link
              to="/userApp/restaurants"
              className="restlandingContainer__content__link restlandingContainer__content--btn"
            >
              Take me to all restaurants
            </Link>
          </div>

          <div className="restlandingContainer__content__div">
            <p className="restlandingContainer__content__p">
              would you like to see your orders?
            </p>
            <Link
              to={`/userApp/user-orders/${user.id}`}
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

export default LandingPage;
