import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenericButton from "../GenericButton/GenericButton";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

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
