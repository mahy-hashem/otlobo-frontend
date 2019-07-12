import React from "react";
import axios from "axios";

import BreadCrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import RestaurantInfoHeader from "./RestaurantInfoHeader";
import Filter from "./Filter";
import MenuItem from "./MenuItem";
import SideCart from "./SideCart";
import Footer from "./Footer";

class RestaurantDetailsPage extends React.Component {
  state = {
    restaurant: [],
    isLoaded: false
  };

  componentDidMount() {
    this.fetchRestaurant();
  }

  fetchRestaurant = () => {
    const restaurantId = this.props.match.params.restaurantId;
    axios
      .get("http://localhost:8080/restaurant/" + restaurantId)
      .then(res => {
        const { data } = res;
        this.setState({
          restaurant: data.restaurant,
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      const { restaurant } = this.state;
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <NavBar />
              </Col>
            </Row>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadCrumb.Item href="/">Home</BreadCrumb.Item>
                  <BreadCrumb.Item href="/restaurants">
                    All Restaurants
                  </BreadCrumb.Item>
                  <BreadCrumb.Item
                    href={`/restaurant/${this.props.match.params.restaurantId}`}
                  >
                    {restaurant[0].name}
                  </BreadCrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col>
                <RestaurantInfoHeader
                  name={restaurant[0].name}
                  address={restaurant[0].address}
                />
              </Col>
            </Row>
            {restaurant[0].menu_items.map(item => {
              const { name, id, picture, description, price } = item;
              return (
                <Row key={id}>
                  <Col>
                    <MenuItem
                      name={name}
                      key={id}
                      id={id}
                      picture={picture}
                      description={description}
                      price={price}
                    />
                  </Col>
                </Row>
              );
            })}
          </Container>
          <div>
            {/* <Filter /> */}
            {/* <SideCart />
            <Footer /> */}
          </div>
        </div>
      );
    }
  }
}

export default RestaurantDetailsPage;
