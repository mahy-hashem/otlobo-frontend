import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import "./Restaurants.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import NavBar from "./NavBar";
import RestaurantCard from "./RestaurantCard";
import Breadcrumb from "./Breadcrumb";
import Filter from "./Filter";
import createSorter from "../util/sort";

class Restaurants extends React.Component {
  state = {
    restaurants: [],
    sorters: [
      {
        property: "name",
        direction: "asc"
      }
    ]
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = () => {
    axios
      .get("http://localhost:8080/restaurants")
      .then(res => {
        this.setState(
          {
            restaurants: res.data.restaurants
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  sortRestaurants = () => {
    let restaurants = this.state.restaurants.sort(
      createSorter(...this.state.sorters)
    );
    this.setState({
      restaurants
    });
  };

  render() {
    return (
      <div className="restaurants-page-container">
        <Container>
          <Row>
            <Col>
              <NavBar>
                <li>
                  <Nav.Link href="/restaurants">All Restaurants</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/active-groups">Active Groups</Nav.Link>
                </li>
                <li>
                  <Nav.Link href="/account">Account</Nav.Link>
                </li>
              </NavBar>
            </Col>
          </Row>
          <Row>
            <Col>
              <Breadcrumb>
                <NavLink to="/">Home</NavLink>
                <p>Restaurants</p>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>All Restaurants</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Filter
                sortRestaurants={this.sortRestaurants}
                sorters={this.state.sorters}
              />
            </Col>
            {/* <Col xs={4}>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Cuisines
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col xs={4}>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Search
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col> */}
          </Row>
          <div className="restaurants-list-container">
            <Switch>
              <Route path="/restaurants">
                {this.state.restaurants.map(restaurant => {
                  const { id, name, address } = restaurant;
                  return (
                    <Row key={id}>
                      <Col>
                        <RestaurantCard
                          key={id}
                          id={id}
                          name={name}
                          address={address}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </Route>
            </Switch>
          </div>
          <div className="filter-container" />
        </Container>
      </div>
    );
  }
}

export default Restaurants;
