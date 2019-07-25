import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

// import countdownTimer from "../../util/countdownTimer";
import "./SingleGroup.scss";
import RestaurantDetailsPage from "../RestaurantDetailsPage/RestaurantDetailsPage";

class SingleGroup extends React.Component {
  state = {
    group: []
  };
  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups = () => {
    const groupId = this.props.match.params.id;
    axios
      .get("http://localhost:8080/activeGroups/" + groupId)
      .then(res => {
        this.setState(
          {
            group: res.data.group
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
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadCrumb.Item href="/">Home</BreadCrumb.Item>
                <BreadCrumb.Item href="/active-groups">
                  All Active Groups
                </BreadCrumb.Item>
                <BreadCrumb.Item href="/active-groups/:groupId">
                  Group
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{this.state.group.restaurant.name} Active Group</h2>
            </Col>
          </Row>
        </Container>
        <ul>
          {this.state.group.orders.map(order => {
            const { id, user, menu_items } = order;
            return (
              <li>
                <Row>
                  <Col />
                </Row>
              </li>
            );
          })}
        </ul>
        <Container />
      </div>
    );
  }
}

export default SingleGroup;
