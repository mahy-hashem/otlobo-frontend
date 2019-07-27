import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import GenericButton from "../GenericButton/GenericButton";
import axios from "axios";
import "./SideCart.scss";

class SideCart extends React.Component {
  render() {
    return (
      <Container className="sideCartContainer">
        <Row>
          <Col>
            <h4>Your Cart</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>{this.props.restaurant.name}</h5>
          </Col>
        </Row>
        {this.props.order.map(item => {
          const { id, name, price, order_item, quantity } = item;
          return (
            <Row>
              <Col>
                <p>{quantity}</p>
              </Col>
              <Col>
                <p>{name}</p>
              </Col>
              <Col>
                <p>$ {price}</p>
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <p>
              Total: ${" "}
              {this.props.orderTotal === "00.00" ? 0 : this.props.orderTotal}
              .00
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <NavLink to={`/restaurant/${this.props.restaurant.id}/checkout`}>
              Proceed to Checkout
            </NavLink>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SideCart;
