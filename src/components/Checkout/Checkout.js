import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import { Elements, StripeProvider } from "react-stripe-elements";

import Breadcrumb from "../Breadcrumb/Breadcrumb";

import Header from "../Header/Header";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import NavLink from "react-bootstrap/NavLink";
import OrderSummary from "./OrderSummary";

class Checkout extends React.Component {
  state = {
    order: [],
    group: [],
    restaurant: [],
    isLoading: true
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
          isLoading: false
        });
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
                  {this.state.restaurant[0].name}
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
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
                <OrderSummary menu_items={this.state.order[0].menu_items} />
                <Row>
                  <Col>
                    <StripeProvider apiKey="pk_test_nKM3abPgU0LJR15gcvwt0Ctq00iuMGYppT">
                      <div className="example">
                        <h1>React Stripe Elements Example</h1>
                        <Elements>
                          <CheckoutForm />
                        </Elements>
                      </div>
                    </StripeProvider>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Checkout;
