import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import countdownTimer from "../../util/countdownTimer";
import "./RestaurantOrders.scss";

import { getLocalStorageItem } from "../../util/localStorage";
class RestaurantOrders extends React.Component {
  state = {
    groups: [],
    restaurantId: null,
    restaurant: null
  };
  componentWillMount() {
    this.getUserFromLocalStorage();
  }

  componentDidMount() {
    console.log("in fetch groups");
    this.fetchGroups();
  }
  getUserFromLocalStorage() {
    const restaurantId = JSON.parse(localStorage.getItem("userId"));
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    this.setState({
      restaurantId,
      restaurant
    });
  }
  setOrderStatus = e => {
    const token = getLocalStorageItem("token");
    const groupId = e.target.id.split(" ")[1];
    const orderStatus = e.target.value;
    axios
      .patch(
        `http://localhost:8080/updateStatus`,
        {
          orderStatus,
          groupId
        },
        {
          headers: {
            Authorization: `bearer ${token}`
          }
        }
      )
      .then(res => {
        this.fetchGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };
  fetchGroups = () => {
    const restaurantId = this.state.restaurantId;
    const token = getLocalStorageItem("token");
    console.log(restaurantId);
    axios
      .get(`http://localhost:8080/allOrders/${restaurantId}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        this.setState(
          {
            groups: res.data.groups,
            restaurantId
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
                <BreadCrumb.Item
                  href={`/app/restaurant-orders/${this.state.restaurantId}`}
                >
                  {this.state.restaurant && this.state.restaurant.name} All
                  Orders
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="restaurantOrders__h2">
                {`${this.state.restaurant && this.state.restaurant.name}
                All Orders`}
              </h2>
            </Col>
          </Row>
        </Container>
        <Container className="groups">
          <ul className="groups__ul">
            {this.state.groups.map(group => {
              return (
                <li key={group.id} className="groups__li">
                  <Row>
                    <Col>
                      <h3 className="groups__h3">{`#Group ${group.id}`}</h3>
                      <span id={group.id} className="groups__timer">
                        {countdownTimer.duration(
                          group.createdAt,
                          group.timeframe
                        )}
                        {countdownTimer.timer(
                          group.createdAt,
                          group.timeframe,
                          group.id
                        )}
                      </span>
                      <span> Minutes</span>
                    </Col>

                    <Col className="groups__orderStatus" xs={2}>
                      <select
                        className="groups__orderStatus__dropdown"
                        name="orderStatusDropdown"
                        id={"orderStatus " + group.id}
                        onChange={this.setOrderStatus}
                        value={group.status}
                      >
                        <option value="pending">pending</option>
                        <option value="opened">opened</option>
                        <option value="parpering">preparing</option>
                        <option value="closed">closed</option>
                      </select>
                    </Col>
                  </Row>
                  <Row>
                    <div className="groups__orders__ul">
                      {group.orders.map(order => {
                        return (
                          <div key={order.id} className="groups__orders__li">
                            <Row className="groups__orders__user">
                              <img
                                src={`http://localhost:8080/${
                                  order.user.image
                                }`}
                                alt={order.user.firstName}
                                className="groups__orders__userImg"
                              />
                              <p className="groups__orders__userName">
                                {order.user.firstName}
                              </p>
                            </Row>
                            <div className="orders__menu__ul">
                              {order.menu_items.map(menu_item => {
                                return (
                                  <Row
                                    key={menu_item.id}
                                    className="orders__menu__li"
                                  >
                                    <Col xs={4}>
                                      <img
                                        src={`http://localhost:8080/${
                                          menu_item.picture
                                        }`}
                                        alt={menu_item.name}
                                        className="orders__menu__img"
                                      />
                                    </Col>
                                    <Col>
                                      <p className="orders__menu__itemQ">
                                        {menu_item.name} x{" "}
                                        {menu_item.order_item.quantity}
                                      </p>
                                    </Col>
                                  </Row>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
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

export default RestaurantOrders;
