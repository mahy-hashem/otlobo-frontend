import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import countdownTimer from "../../util/countdownTimer";
import "./ActiveGroups.scss";

class ActiveGroups extends React.Component {
  state = {
    groups: []
  };
  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups = () => {
    axios
      .get("http://localhost:8080/activeGroups")
      .then(res => {
        this.setState(
          {
            groups: res.data.groups
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
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>All Active Groups</h2>
            </Col>
          </Row>
        </Container>
        <Container>
          <ul>
            {this.state.groups.map(group => {
              const { id, restaurant, orders } = group;
              return (
                <li key={id}>
                  <Row>
                    <Col>
                      <Link to={`/active-groups/${id}`}>
                        <h3>{restaurant.name}</h3>
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <ul>
                      {orders.slice(0, 5).map(order => {
                        return (
                          <Col key={id}>
                            <li>
                              <img
                                src={order.user.image}
                                alt={order.user.firstName}
                              />
                              <p>{order.user.firstName}</p>
                            </li>
                          </Col>
                        );
                      })}
                    </ul>
                    <Col>
                      <p id={group.id}>
                        {countdownTimer.duration(
                          group.createdAt,
                          group.timeframe
                        )}
                        {countdownTimer.timer(
                          group.createdAt,
                          group.timeframe,
                          group.id
                        )}
                      </p>
                      <p>minutes</p>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    );
  }
}

export default ActiveGroups;
