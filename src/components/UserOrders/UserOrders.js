import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BreadCrumb from "react-bootstrap/Breadcrumb";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

import countdownTimer from "../../util/countdownTimer";
import "./UserOrders.scss";

import { getLocalStorageItem } from "../../util/localStorage";

class UserOrders extends React.Component {
  state = {
    orders: [],
    userId: null,
    user: null
  };
  componentWillMount() {
    this.getUserFromLocalStorage();
  }

  componentDidMount() {
    console.log("in fetch groups");
    this.fetchOrders();
  }
  getUserFromLocalStorage() {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      userId,
      user
    });
  }
  fetchOrders = () => {
    const userId = this.state.userId;
    const token = getLocalStorageItem("token");
    console.log(userId);
    axios
      .get(`http://localhost:8080/userOrders/${userId}`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        this.setState(
          {
            orders: res.data.orders
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
                  href={`/userApp/user-orders/${this.state.userId}`}
                >
                  {this.state.user && this.state.user.name} All Orders
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="userOrders__h2">
                {`${this.state.user && this.state.user.firstName}
                All Orders`}
              </h2>
            </Col>
          </Row>
        </Container>
        <Container className="userOrders__orders">
          <ul className="userOrders__orders__ul">
            {this.state.orders &&
              this.state.orders.map(order => {
                return (
                  <li key={order.id} className="userOrders__orders__li">
                    <Row>
                      <Col xs={10}>
                        <h3 className="userOrders__orders__h3">{`#Order ${
                          order.id
                        }`}</h3>
                      </Col>
                      <Col xs={2}>
                        <p className="userOrders__orders__status">
                          {order.group && order.group.status}
                        </p>
                      </Col>
                    </Row>
                    <div className="userOrders__menu__ul">
                      {order.menu_items.map(menu_item => {
                        return (
                          <Row className="userOrders__menu__li">
                            <Col xs={2}>
                              <img
                                src={`http://localhost:8080/${
                                  menu_item.picture
                                }`}
                                alt={menu_item.name}
                                className="userOrders__menu__img"
                              />
                            </Col>
                            <Col xs={5}>
                              <p className="userOrders__menu__name">
                                {menu_item.name}
                              </p>
                            </Col>
                            <Col xs={5}>
                              <p className="userOrders__menu__price">
                                {menu_item.price} x{" "}
                                {menu_item.order_item.quantity}
                              </p>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                    <Row className="userOrders__orders__totaldate">
                      <Col>
                        <p className="userOrders__orders__date">
                          Date of Order: {order.createdAt.split("T")[0]}
                        </p>
                      </Col>
                      <Col xs={5}>
                        <p className="userOrders__orders__total">
                          Total: {order.total}
                        </p>
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

export default UserOrders;
