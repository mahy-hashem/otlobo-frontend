import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
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
                  <h3>Order Status:</h3>
                  <ProgressBar animated now={45} />
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
