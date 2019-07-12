import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenericButton from "./GenericButton";

class MenuItem extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>{this.props.picture}</Col>
          <Col xs={5}>
            <Container>
              <Row>
                <Col>
                  <h3>{this.props.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>{this.props.description}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Price: {this.props.price}</p>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <p>Rating</p>
          </Col>
          <Col>
            <GenericButton
              className="add-order-btn"
              onClick={this.addMenuItem}
              content="+"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MenuItem;
