import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GenericButton from "../GenericButton/GenericButton";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";

class Filter extends React.Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Nav defaultActiveKey="#first">
              <Nav.Item>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <Nav.Link href="#first">Filters</Nav.Link>
                </Accordion.Toggle>
              </Nav.Item>
              <Nav.Item>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  <Nav.Link href="#first">Cuisines</Nav.Link>
                </Accordion.Toggle>
              </Nav.Item>
              <Nav.Item>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  <Nav.Link href="#first">Search</Nav.Link>
                </Accordion.Toggle>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <ListGroup>
              <ListGroup.Item
                action
                onClick={this.props.sortRestaurants}
                value="name"
              >
                Sort from A to Z
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={this.props.sortRestaurants}
                value="newest"
              >
                Sort newest
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm the bodysss</Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Aaaaah</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Filter;
