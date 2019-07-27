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

import { getLocalStorageItem } from "../../util/localStorage";

class SingleGroup extends React.Component {
  state = {
    group: {}
  };
  componentDidMount() {
    console.log("in single group");
    this.fetchGroup();
  }

  fetchGroup = () => {
    const groupId = this.props.match.params.groupId;
    console.log(groupId);
    const token = getLocalStorageItem("token");
    axios
      .get(`http://localhost:8080/activeGroups/${groupId}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        //console.log(res.data.group.restaurant);
        this.setState(
          {
            group: res.data.group
          },
          () => {
            console.log(this.state.group.restaurant);
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
                <BreadCrumb.Item
                  href={`/userApp/active-groups/${
                    this.props.match.params.groupId
                  }`}
                >
                  Group
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to={`/userApp/restaurant/${this.state.group.restaurantId}`}>
                <h2>
                  {" "}
                  {this.state.group &&
                    this.state.group.restaurant &&
                    `${this.state.group.restaurant.name} Active Group`}
                </h2>
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
          <Container>
            <ul>
              {this.state.group &&
                this.state.group.orders &&
                this.state.group.orders.map(order => {
                  const { id, user, menu_items } = order;
                  return (
                    <li key={id}>
                      <Row>
                        <Col>
                          <img
                            src={`http://localhost:8080/${user.image}`}
                            alt={user.firstName}
                          />
                          <h3>{user.firstName}</h3>
                        </Col>
                      </Row>
                      <Row>
                        <ul>
                          {menu_items.map(menu_item => {
                            return (
                              <li key={id}>
                                <Col>
                                  <img
                                    src={`http://localhost:8080/${
                                      menu_item.picture
                                    }`}
                                    alt={menu_item.name}
                                  />
                                  <p>{menu_item.name}</p>
                                  <p>{menu_item.description}</p>
                                </Col>
                                <Col>
                                  <p>
                                    {menu_item.price} x{" "}
                                    {menu_item.order_item.quantity}
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
          </Container>
        </Container>
      </div>
    );
  }
}

export default SingleGroup;
