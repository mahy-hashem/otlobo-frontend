import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

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
          <Row className="activeGroup">
            <Col xs={10}>
              <Link
                to={`/userApp/restaurant/${this.state.group.restaurantId}`}
                className="activeGroup__a"
              >
                <h2 className="activeGroup__h2">
                  {" "}
                  {this.state.group &&
                    this.state.group.restaurant &&
                    `${this.state.group.restaurant.name} Active Group`}
                </h2>
              </Link>
            </Col>
            <Col xs={2} className="activeGroup__timer">
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
          <Container className="activeGroup__orders">
            <ul className="activeGroup__orders__ul">
              {this.state.group &&
                this.state.group.orders &&
                this.state.group.orders.map(order => {
                  const { id, user, menu_items } = order;
                  return (
                    <li key={id} className="activeGroup__orders__li">
                      <Row>
                        <Col className="activeGroup__orders__user">
                          <img
                            src={`http://localhost:8080/${user.image}`}
                            alt={user.firstName}
                            className="activeGroup__orders__user__img"
                          />
                          <h3 className="activeGroup__orders__user__h3">
                            {user.firstName}
                          </h3>
                        </Col>
                      </Row>
                      <Row>
                        <ul className="activeGroup__orders__menu">
                          {menu_items.map(menu_item => {
                            return (
                              <li
                                key={id}
                                className="activeGroup__orders__menu__li"
                              >
                                <Card>
                                  <Card.Img
                                    src={`http://localhost:8080/${
                                      menu_item.picture
                                    }`}
                                    alt={menu_item.name}
                                    className="activeGroup__orders__menu__img"
                                  />
                                  <Card.Body>
                                    <Card.Title className="activeGroup__orders__menu__name">
                                      {" "}
                                      {menu_item.name}{" "}
                                    </Card.Title>
                                    <Card.Text className="activeGroup__orders__menu__description">
                                      {menu_item.description}
                                    </Card.Text>
                                  </Card.Body>
                                  <Card.Footer>
                                    <p className="activeGroup__orders__menu__price">
                                      {menu_item.price} x{" "}
                                      {menu_item.order_item.quantity}
                                    </p>
                                  </Card.Footer>
                                </Card>
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
