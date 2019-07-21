import React from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

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
                <Container key={id}>
                  <li>
                    <Row>
                      <Col>
                        <h3>{restaurant.name}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <ul>
                        {orders.map(order => {
                          return (
                            <Col key={id}>
                              <li>
                                <img
                                  src={order.user.firstName}
                                  alt={order.user.firstName}
                                />
                                <p>{order.user.firstName}</p>
                              </li>
                            </Col>
                          );
                        })}
                      </ul>
                    </Row>
                  </li>
                </Container>
              );
            })}
          </ul>
        </Container>
      </div>
    );
  }
}

export default ActiveGroups;
