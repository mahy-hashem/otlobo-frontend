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

class Checkout extends React.Component {
  state = {
    order: [],
    group: [],
    restaurant: [],
    orderTotal: null,
    timeframe: null,
    isLoading: true,
    paymentCompleted: false
  };

  componentDidMount() {
    this.fetchRestaurant();
    this.getCart();
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
          group:
            data.restaurant[0].group === null ? [] : [data.restaurant[0].group]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getCart = () => {
    const userId = localStorage.getItem("userId");
    const restaurantId = this.props.match.params.restaurantId;

    const order = JSON.parse(localStorage.getItem("order"));
    const orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
    this.setState({
      order,
      orderTotal,
      isLoading: false
    });
  };

  setTimer = value => {
    this.setState({
      timeframe: value
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
                  {/* {this.state.restaurant[0].name} */}
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          {this.state.group.length === 0 && (
            <OrderTimeframe onChange={this.setTimer} />
          )}
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <p>Order Summary</p>
                  </Col>
                  <Col>
                    <NavLink
                      to={`/restaurant/${this.props.match.params.restaurantId}`}
                    >
                      Edit Order
                    </NavLink>
                  </Col>
                </Row>
                <Row>
                  <Col>{/* <p>{this.state.restaurant[0].name}</p> */}</Col>
                  <Col>
                    <p>Opening Hours</p>
                  </Col>
                </Row>
                <OrderSummary
                  menu_items={this.state.order}
                  orderTotal={this.state.orderTotal}
                  control="one"
                />
                <StripeBtn
                  restaurantId={this.props.match.params.restaurantId}
                  menu_items={this.state.order}
                  orderTotal={this.state.orderTotal * 100}
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
