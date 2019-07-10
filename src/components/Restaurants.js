import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import "./Restaurants.scss";

import NavBar from "./NavBar";
import RestaurantCard from "./RestaurantCard";
import Breadcrumb from "./Breadcrumb";

class Restaurants extends React.Component {
  state = {
    restaurants: []
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = () => {
    axios
      .get("http://localhost:8080/restaurants")
      .then(res => {
        this.setState(
          {
            restaurants: res.data.restaurants
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="restaurants-page-container">
        <NavBar>
          <li>
            <NavLink to="/restaurants">All Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/active-groups">Active Groups</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
        </NavBar>
        <Breadcrumb>
          <NavLink to="/">Home</NavLink>
          <p>Restaurants</p>
        </Breadcrumb>
        <Switch>
          <Route path="/restaurants">
            {this.state.restaurants.map(restaurant => {
              const { id, name, address } = restaurant;
              return (
                <RestaurantCard
                  key={id}
                  id={id}
                  name={name}
                  address={address}
                />
              );
            })}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Restaurants;
