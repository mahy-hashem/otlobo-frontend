import React from "react";

import RestaurantInfoHeader from "./RestaurantInfoHeader";
import Filter from "./Filter";
import MenuItems from "./MenuItems";
import SideCart from "./SideCart";
import Footer from "./Footer";

class RestaurantDetailsPage extends React.Component {
  render() {
    return (
      <div>
        {/* <NavBar /> */}
        <RestaurantInfoHeader />
        <div>
          <Filter />
          <MenuItems />
          <SideCart />
          <Footer />
        </div>
      </div>
    );
  }
}

export default RestaurantDetailsPage;
