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
    totalPrice: 0.0,
    timeframe: null,
    isLoading: true,
    paymentCompleted: false
  };

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    const userId = localStorage.getItem("userId");
    const restaurantId = this.props.match.params.restaurantId;
    axios
      .get("http://localhost:8080/restaurant/" + restaurantId + "/checkout", {
        params: {
          userId,
          restaurantId
        }
      })
      .then(result => {
        this.setState({
          order: [result.data.order],
          group: [result.data.group],
          restaurant: [result.data.group.restaurant],
          totalPrice: result.data.totalPrice,
          isLoading: false,
          paymentCompleted: result.data.group.paid === false ? false : true
        });
      })
      .catch(err => {
        console.log(err);
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
                  {this.state.restaurant[0].name}
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <OrderTimeframe onChange={this.setTimer} />
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
                  <Col>
                    <p>{this.state.restaurant[0].name}</p>
                  </Col>
                  <Col>
                    <p>Opening Hours</p>
                  </Col>
                </Row>
                <OrderSummary
                  menu_items={this.state.order[0].menu_items}
                  totalPrice={this.state.totalPrice}
                  control="one"
                />
                <StripeBtn
                  restaurantId={this.props.match.params.restaurantId}
                  menu_items={this.state.order[0].menu_items}
                  totalPrice={this.state.totalPrice * 100}
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
