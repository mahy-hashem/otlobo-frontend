import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenericButton from "../GenericButton/GenericButton";

class MenuItem extends React.Component {
  state = {
    userType: ""
  };

  componentDidMount() {
    const userType = JSON.parse(localStorage.getItem("userType"));
    this.setState({
      userType
    });
  }

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
          {this.state.userType === "user" && (
            <React.Fragment>
              <Col>
                <p>Rating</p>
              </Col>
              <Col>
                <GenericButton
                  className="add-order-btn"
                  onClick={() => this.props.addMenuItem(this.props.item)}
                  content="+"
                />
              </Col>
            </React.Fragment>
          )}
          {this.state.userType === "restaurant" && (
            <Col>
              <GenericButton
                className="add-order-btn"
                //onClick={() => this.props.addMenuItem(this.props.item)}
                content="Edit"
              />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default MenuItem;
