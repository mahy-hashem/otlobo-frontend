import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>otlobo</h1>
      <p>order your food with your group</p>
      <Link to="/signup">sign up</Link>
      <span>or</span>
      <Link to="/login">log in</Link>
    </div>
  );
}

export default LandingPage;
