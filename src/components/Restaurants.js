import React from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import RestaurantCard from "./RestaurantCard";
import RestaurantDetailsPage from "./RestaurantDetailsPage";

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
      <div>
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
          <Route
            path="/restaurant/:restaurantId"
            component={RestaurantDetailsPage}
          />
        </Switch>
      </div>
    );
  }
}

export default Restaurants;
