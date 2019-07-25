import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavLink from "react-bootstrap/NavLink";
import BreadCrumb from "react-bootstrap/Breadcrumb";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import OrderStatus from "../Checkout/OrderStatus";
import OrderSummary from "../Checkout/OrderSummary";

class GroupOrderSummary extends React.Component {
  state = {
    orders: null,
    group: null,
    restaurant: null,
    totalPrice: 0.0,
    isLoading: true
  };

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    const userId = localStorage.getItem("userId");
    const restaurantId = this.props.match.params.restaurantId;
    axios
      .get(
        "http://localhost:8080/restaurant/" +
          restaurantId +
          "/checkout/success",
        {
          params: {
            userId,
            restaurantId
          }
        }
      )
      .then(result => {
        this.setState({
          orders: result.data.group.orders,
          group: [result.data.group],
          restaurant: result.data.group.restaurant,
          isLoading: false
        });
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <Container>
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
                  {this.state.restaurant.name}
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <OrderStatus />
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <p>Order Summary</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{this.state.restaurant.name}</p>
                  </Col>
                  <Col>
                    <p>Opening Hours</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2>Group #{this.state.group[0].id}</h2>
                  </Col>
                </Row>
                <OrderSummary
                  menu_items={this.state.orders[0].menu_items}
                  totalPrice={this.state.totalPrice}
                  orders={this.state.orders}
                  control="group"
                />
              </Container>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default GroupOrderSummary;
