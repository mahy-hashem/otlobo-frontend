import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class OrderSummary extends React.Component {
  render() {
    return (
      <div>
        {this.props.control === "one" && (
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
                {this.props.orderItems.map(item => {
                  const { id, name, price, quantity } = item;
                  return (
                    <Row key={id}>
                      <Col>
                        <p>{name}</p>
                      </Col>
                      <Col>
                        <p>$ {price}</p>
                      </Col>
                      <Col>
                        <p>{quantity}</p>
                      </Col>
                    </Row>
                  );
                })}
                <Row>
                  <Col>
                    <p>Total: $ {this.props.orderTotal}</p>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        )}
        {this.props.control === "group" && (
          <Row>
            <Col>
              <Container>
                {this.props.orders.map(order => {
                  const { id, total, menu_items } = order;
                  return (
                    <div>
                      <Row>
                        <Col>
                          <p>Order #{id}</p>
                        </Col>
                      </Row>
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
                      {menu_items.map(item => {
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
                          <p>Total: ${total}</p>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </Container>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default OrderSummary;
