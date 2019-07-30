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

import { getLocalStorageItem } from "../../util/localStorage";

class ActiveGroups extends React.Component {
  state = {
    groups: []
  };
  componentDidMount() {
    this.fetchGroups();
  }

  fetchGroups = () => {
    const token = getLocalStorageItem("token");
    axios
      .get("http://localhost:8080/activeGroups", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
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
                <BreadCrumb.Item href="/userApp/active-groups">
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
            {this.state.groups.length === 0 && (
              <h1>No Active Groups Right Now</h1>
            )}
            {this.state.groups.length > 0 &&
              this.state.groups.map(group => {
                const { id, restaurant, orders } = group;
                return (
                  <div className="background">
                    <li key={id} className="activeGroup">
                      <Row>
                        <Col xs={10}>
                          <Link
                            to={`/userApp/active-groups/${id}`}
                            className="activeGroup__a"
                          >
                            <h3 className="activeGroup__h3">
                              {restaurant.name}
                            </h3>
                          </Link>
                        </Col>
                        <Col xs={2} className="activeGroup__timer">
                          <p id={group.id}>
                            {countdownTimer.timer(
                              group.createdAt,
                              group.timeframe,
                              group.id
                            )}
                          </p>
                          <p>minutes</p>
                        </Col>
                      </Row>
                      <Row>
                        <ul className="activeGroup__user_ul">
                          {orders.slice(0, 10).map(order => {
                            return (
                              <li className="activeGroup__user_li">
                                <Col key={id}>
                                  <img
                                    src={`http://localhost:8080/${
                                      order.user.image
                                    }`}
                                    alt={order.user.firstName}
                                    className="activeGroup__user_img"
                                  />
                                  <p className="activeGroup__user_name">
                                    {order.user.firstName}
                                  </p>
                                </Col>
                              </li>
                            );
                          })}
                        </ul>
                      </Row>
                    </li>
                  </div>
                );
              })}
          </ul>
        </Container>
      </div>
    );
  }
}

export default ActiveGroups;
