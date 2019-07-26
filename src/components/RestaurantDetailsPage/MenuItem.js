import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenericButton from "../GenericButton/GenericButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./MenuItem.scss";
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
      <React.Fragment>
        <Container>
          <Card style={{ width: "70%", marginTop: "20px" }}>
            <Row>
              <Col>
                <Card.Img variant="top" src={this.props.picture} />
              </Col>
              <Col>
                <Card.Body>
                  <Card.Title>{this.props.name}</Card.Title>
                  <Card.Text className="text">
                    <p>{this.props.description}</p>
                    <p>Price: {this.props.price}$</p>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col className="actions">
                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="grey" />
                <FontAwesomeIcon icon={faTimes} size="lg" color="grey" />
              </Col>
            </Row>
          </Card>
        </Container>
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
      </React.Fragment>
    );
  }
}

export default MenuItem;

/*
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
                    {/* {this.state.userType === "restaurant" && (
          <Col>
            <GenericButton
              className="add-order-btn"
              //onClick={() => this.props.addMenuItem(this.props.item)}
              content="Edit"
            />
          </Col>
        )} */
