import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.scss";

function LandingPage() {
  return (
    <div className="restlandingPage">
      <div className="restlandingContainer">
        <div className="restlandingContainer__content">
          <h2 className="restlandingContainer__content__h2">Welcome, User</h2>
          <div className="restlandingContainer__content__div">
            <p className="restlandingContainer__content__p">
              what would you like to eat today with your group?
            </p>
            <Link
              to="/restaurants"
              className="restlandingContainer__content__link restlandingContainer__content--btn"
            >
              take me to all restaurants
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

export default LandingPage;
