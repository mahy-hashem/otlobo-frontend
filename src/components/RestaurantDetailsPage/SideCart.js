import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GenericButton from "../GenericButton/GenericButton";

class SideCart extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h4>Your Cart</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Restaurant Name</h5>
          </Col>
        </Row>
        {this.props.order.map(item => {
          const { id, name, price } = item;
          return (
            <Row>
              <Col>
                <p>Quantity</p>
              </Col>
              <Col>
                <p>{name}</p>
              </Col>
              <Col>
                <p>{price}</p>
              </Col>
            </Row>
          );
        })}
        <Row>
          <Col>
            <p>Subtotal: Price</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Delivery fee: Price</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Total price: Price</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <GenericButton content="Proceed to Checkout" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SideCart;
