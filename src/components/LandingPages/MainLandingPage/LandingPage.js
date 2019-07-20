import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.scss";

function LandingPage() {
  return (
    <div className="landingPage">
      <div className="landingContainer">
        <div className="landingContainer__content">
          <h2 className="landingContainer__content__h2">otlobo</h2>
          <p className="landingContainer__content__p">
            order your food with your group
          </p>
          <Link
            to="/signup"
            className="landingContainer__content__link landingContainer__content--btn"
          >
            sign up
          </Link>
          <span className="landingContainer__content__span">or</span>
          <Link
            to="/login"
            className="landingContainer__content__link landingContainer__content--btn"
          >
            log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
