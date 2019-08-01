import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenericButton from "../GenericButton/GenericButton";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
//import Button from "react-bootstrap/Button";
import "./MenuItem.scss";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTimes,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

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
        <Card style={{ width: "15rem" }} className="menuitems__card">
          <Card.Img
            variant="top"
            src={this.props.picture}
            className="menuItemImg"
          />
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {this.props.name}
            </Card.Title>
            <Card.Text className="text">
              <p>{this.props.description}</p>
              <p>Price: {this.props.price}$</p>
            </Card.Text>
            <Col
              className="actions"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              {this.state.userType === "user" ? (
                <Button
                  onClick={() => this.props.addMenuItem(this.props.item)}
                  style={{
                    backgroundColor: "rgba(205, 137, 254, 1)",
                    border: "none"
                  }}
                >
                  Add to Cart
                </Button>
              ) : (
                <React.Fragment>
                  <FontAwesomeIcon icon={faPencilAlt} size="lg" color="grey" />
                  <FontAwesomeIcon icon={faTimes} size="lg" color="grey" />
                </React.Fragment>
              )}
            </Col>
          </Card.Body>
        </Card>
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
