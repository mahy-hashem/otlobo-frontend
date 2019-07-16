import React from "react";
import axios from "axios";

import BreadCrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import NavBar from "../NavBar/NavBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import RestaurantInfoHeader from "./RestaurantInfoHeader";
import Filter from "../Filter/Filter";
import MenuItem from "./MenuItem";
import SideCart from "./SideCart";
import Footer from "../Footer/Footer";

class RestaurantDetailsPage extends React.Component {
  state = {
    restaurant: [],
    activeGroup: [],
    order: [],
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
        console.log(res);
        this.setState({
          restaurant: data.restaurant,
          activeGroup:
            data.restaurant[0].group === null ? [] : [data.restaurant[0].group],
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addMenuItem = item => {
    const restaurantId = this.props.match.params.restaurantId;
    if (this.state.activeGroup.length > 0 && this.state.order.length === 0) {
      window.alert(
        "An active group for this restaurant already exists, your order will be added to the existing group after checkout and payment."
      );
    } else {
      axios
        .post("http://localhost:8080/restaurant/" + restaurantId)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
    console.log(item);
    const updatedOrder = [...this.state.order, item];
    this.setState({
      order: updatedOrder
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
            <Row>
              <Col>
                <Container>
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
                            item={item}
                            addMenuItem={this.addMenuItem}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              </Col>
              <Col lg={3}>
                <SideCart order={this.state.order} />
              </Col>
            </Row>
          </Container>
          <div>
            {/* <Filter /> */}
            {/* <Footer /> */}
          </div>
        </div>
      );
    }
  }
}

export default RestaurantDetailsPage;
