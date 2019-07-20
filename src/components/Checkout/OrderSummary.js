import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class OrderSummary extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                <p>Item(s)</p>
              </Col>
              <Col>
                <p>Price</p>
              </Col>
              <Col>
                <p>Qty</p>
              </Col>
            </Row>
            {this.props.menu_items.map(item => {
              const { name, price, order_item } = item;
              return (
                <Row>
                  <Col>
                    <p>{name}</p>
                  </Col>
                  <Col>
                    <p>{price}</p>
                  </Col>
                  <Col>
                    <p>{order_item.quantity}</p>
                  </Col>
                </Row>
              );
            })}
            <Row>
              <Col>
                <p>Total: ${this.props.totalPrice}</p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    );
  }
}

export default OrderSummary;
