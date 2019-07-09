import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./SignUp.css";

class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
        <form>
          <fieldset>
            <legend>Create an account</legend>
            <div className="container__type">
              <input type="radio" id="user" name="type" />
              <label htmlFor="user">I am a user</label>
              <input type="radio" id="restaurant" name="type" />
              <label htmlFor="restaurant">I am a restaurant</label>
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" name="password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" />
            </div>
            <button>Create Account</button>
          </fieldset>
        </form>
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
      </div>
    );
  }
}

export default withRouter(SignUp);
