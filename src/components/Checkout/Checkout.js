import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import NavLink from "react-bootstrap/NavLink";

import Breadcrumb from "../Breadcrumb/Breadcrumb";
import OrderSummary from "./OrderSummary";
import StripeBtn from "./StripeBtn";
import OrderTimeframe from "./OrderTimeframe";
import OrderStatus from "./OrderStatus";

import "./Checkout.scss";
class Checkout extends React.Component {
  state = {
    order: [],
    group: null,
    restaurant: null,
    orderTotal: null,
    timeframe: null,
    isLoaded: false,
    paymentCompleted: false
  };

  componentDidMount() {
    this.fetchRestaurant();
  }

  // get order details from local storage and set state
  getCart = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    const orderTotal = `${JSON.parse(localStorage.getItem("orderTotal"))}.00`;
    this.setState({
      order,
      orderTotal,
      isLoaded: true
    });
  };

  // fetch restaurant and active group details, calls getCart()
  fetchRestaurant = () => {
    const restaurantId = this.props.match.params.restaurantId;
    axios
      .get("http://localhost:8080/restaurant/" + restaurantId)
      .then(res => {
        const { data } = res;
        console.log(res);
        this.setState({
          restaurant: data.restaurant[0],
          group:
            data.restaurant[0].group === null ? null : data.restaurant[0].group
        });
      })
      .then(result => {
        this.getCart();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // captures timeframe value
  setTimer = value => {
    this.setState({
      timeframe: value
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
          {!this.state.group && <OrderTimeframe onChange={this.setTimer} />}
          <Row>
            <Col>
              <Container className="orderContainer">
                <Row>
                  <Col>
                    <h2>Order Summary</h2>
                  </Col>
                  {/* <Col>
                    <NavLink
                      to={`/restaurant/${this.props.match.params.restaurantId}`}
                    >
                      Edit Order
                    </NavLink>
                  </Col> */}
                </Row>
                <Row>
                  <Col>
                    <h3>{this.state.restaurant.name}</h3>
                  </Col>
                  {/* <Col>
                    <p>Opening Hours</p>
                  </Col> */}
                </Row>
                <OrderSummary
                  orderItems={this.state.order}
                  orderTotal={this.state.orderTotal}
                  control="one"
                />
                <StripeBtn
                  restaurantId={this.props.match.params.restaurantId}
                  orderItems={this.state.order}
                  orderTotal={parseFloat(this.state.orderTotal) * 100}
                  timeframe={this.state.timeframe}
                />
              </Container>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Checkout;
