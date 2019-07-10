import React from "react";

import RestaurantDetailsPage from "./components/RestaurantDetailsPage";

class Restaurant extends React.Component {
  render() {
    return (
      <div>
        <Route
          path="/restaurant/:restaurantId"
          component={RestaurantDetailsPage}
        />
      </div>
    );
  }
}

export default Restaurant;
