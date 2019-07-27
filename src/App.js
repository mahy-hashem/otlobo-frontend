import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { getLocalStorageItem } from "./util/localStorage";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPages/MainLandingPage/LandingPage";
import UserLandingPage from "./components/LandingPages/LandingPageUser/LandingPage";
import RestLandingPage from "./components/LandingPages/LandingPageRestaurant/LandingPage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage/RestaurantDetailsPage";
import SignUp from "./components/Signup/SignUp";
import Login from "./components/Login/Login";
import UserApp from "./components/UserApp/UserApp";
import RestApp from "./components/RestApp/RestApp";

class App extends React.Component {
  state = {
    isAuthenticated: false,
    checkedSignedIn: false,
    user: null
  };

  componentDidMount() {
    this.authenticate()
      .then(res => {
        console.log("=============", res);
        const userType = getLocalStorageItem("userType");
        const userId = getLocalStorageItem("userId");
        this.setState(
          {
            isAuthenticated: res,
            checkedSignedIn: true,
            user: {
              userId,
              userType
            }
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        this.setState({
          checkedSignedIn: true
        });
      });
  }

  authenticate = cb => {
    const url = process.env.REACT_APP_URL;
    const token = getLocalStorageItem("token");
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/tokenValidation`, {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  };

  logout = () => {
    localStorage.clear();
    // send invalidate token request
    this.setState({
      isAuthenticated: false,
      user: null
    });
    this.props.history.push("/");
  };

  setLoggedUser = user => {
    this.setState({
      isAuthenticated: true,
      user
    });
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    if (!this.state.checkedSignedIn) {
      return null;
    }
    if (this.state.isAuthenticated && this.props.location.pathname === "/") {
      if (this.state.user.userType === "user") {
        return <Redirect to={`userApp/${this.state.user.userType}Index`} />;
      } else if (this.state.user.userType === "restaurant") {
        return <Redirect to={`app/${this.state.user.userType}Index`} />;
      }
    }

    if (this.state.user && this.state.user.userType === "restaurant") {
      return (
        <PrivateRoute
          path={`${this.props.match.url}app`}
          user={this.state.user}
          pageType="restaurant"
          component={RestApp}
          logout={this.logout}
        />
      );
    } else if (this.state.user && this.state.user.userType === "user") {
      return (
        <PrivateRoute
          path={`${this.props.match.url}userApp`}
          user={this.state.user}
          pageType="user"
          component={UserApp}
          logout={this.logout}
        />
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={LandingPage} />;
          <Route
            path="/signup"
            render={props => (
              <SignUp {...props} setLoggedUser={this.setLoggedUser} />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login {...props} setLoggedUser={this.setLoggedUser} />
            )}
          />
        </Switch>
      );
    }

    //const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isAuthenticated, user } = this.state;
    console.log("this.props.location", this.props.location);

    if (isAuthenticated && this.props.location.pathname === "/") {
      return <Redirect to={`app/${user.userType}Index`} />;
    }

    console.log(this.props.location.pathname);
    return (
      <Switch>
        {/* <PrivateRoute
          path={`${this.props.match.url}app`}
          user={this.state.user}
          pageType="user"
          component={UserApp}
          logout={this.logout}
        /> */}

        <Route exact path="/" component={LandingPage} />
        <PrivateRoute
          path={`${this.props.match.url}app`}
          user={this.state.user}
          pageType="restaurant"
          component={RestApp}
          logout={this.logout}
        />
        {/* <PrivateRoute
          path="/userIndex"
          user={this.state.user}
          pageType="user"
          component={UserLandingPage}
          logout={this.logout}
        />
        <PrivateRoute
          path="/restaurantIndex"
          user={this.state.user}
          pageType="restaurant"
          component={RestLandingPage}
          logout={this.logout}
        /> */}
        {/* <PrivateRoute
          path="/menu/:restaurantId"
          user={this.state.user}
          pageType="restaurant"
          component={RestaurantDetailsPage}
        /> */}
        <Route
          path="/signup"
          render={props => (
            <SignUp {...props} setLoggedUser={this.setLoggedUser} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login {...props} setLoggedUser={this.setLoggedUser} />
          )}
        />
      </Switch>
    );
  }
}

const PrivateRoute = ({
  component: Component,
  user,
  pageType,
  logout,
  ...rest
}) => {
  console.log("in private route");
  console.log(user);
  //console.log(user.userType);
  console.log(pageType);
  return (
    <Route
      {...rest}
      render={props =>
        user && user.userType === pageType ? (
          <Component {...props} logout={logout} user={user} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default withRouter(App);
