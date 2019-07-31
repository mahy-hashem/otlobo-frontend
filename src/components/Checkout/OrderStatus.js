import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import countdownTimer from "../../util/countdownTimer";

class OrderStatus extends React.Component {
  state = {
    orderStatus: null,
    order: null
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Thank you for ordering from Otlobo.</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h3>Time left:</h3>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrderStatus;
