import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import countdownTimer from "../../util/countdownTimer";
import "./SingleGroup.scss";

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
              <Link to={`/restaurant/${this.state.group.restaursntId}`}>
                <h2>{this.state.group.restaurant.name} Active Group</h2>
              </Link>
            </Col>
            <Col>
              <p id={this.state.group.id}>
                {countdownTimer.duration(
                  this.state.group.createdAt,
                  this.state.group.timeframe
                )}
                {countdownTimer.timer(
                  this.state.group.createdAt,
                  this.state.group.timeframe,
                  this.state.group.id
                )}
              </p>
              <p>minutes</p>
            </Col>
          </Row>
        </Container>
        <ul>
          {this.state.group.orders.map(order => {
            const { id, user, menu_items } = order;
            return (
              <li key={id}>
                <Row>
                  <Col>
                    <img src={user.image} alt={user.firstName} />
                    <h3>{user.firstName}</h3>
                  </Col>
                </Row>
                <Row>
                  <ul>
                    {menu_items.map(menu_item => {
                      return (
                        <li key={id}>
                          <Col>
                            <img src={menu_item.image} alt={menu_item.name} />
                            <p>{menu_item.name}</p>
                            <p>{menu_item.description}</p>
                          </Col>
                          <Col>
                            <p>
                              {menu_item.price} x {menu_item.quantity}
                            </p>
                          </Col>
                        </li>
                      );
                    })}
                  </ul>
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
