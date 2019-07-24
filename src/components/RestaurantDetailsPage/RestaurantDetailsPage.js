import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import BreadCrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import RestaurantInfoHeader from "./RestaurantInfoHeader";
import Filter from "../Filter/Filter";
import MenuItem from "./MenuItem";
import SideCart from "./SideCart";
import Footer from "../Footer/Footer";

class RestaurantDetailsPage extends React.Component {
  state = {
    restaurant: [],
    activeGroup: [],
    order: [],
    orderTotal: 0,
    itemsInCart: [],
    totalPrice: null,
    isLoaded: false
  };

  componentDidMount() {
    this.fetchRestaurant();
  }

  fetchRestaurant = () => {
    const restaurantId = this.props.match.params.restaurantId;
    axios
      .get("http://localhost:8080/restaurant/" + restaurantId)
      .then(res => {
        const { data } = res;
        console.log(res);
        this.setState({
          restaurant: data.restaurant,
          activeGroup:
            data.restaurant[0].group === null ? [] : [data.restaurant[0].group],
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addMenuItem = item => {
    // const restaurantId = this.props.match.params.restaurantId;
    // const menuItemId = item.id;
    // const userId = localStorage.getItem("userId");
    let updatedOrder;
    const orderTotal = this.state.orderTotal + item.price;

    if (this.state.activeGroup.length > 0) {
      window.alert(
        "An active group for this restaurant already exists, your order will be added to the existing group after checkout and payment."
      );
    }
    const increaseQuantity = this.state.order.find(
      orderItem => orderItem.id === item.id
    );
    console.log(increaseQuantity);
    if (!increaseQuantity) {
      item.quantity = 1;
      updatedOrder = [...this.state.order, item];
      this.setState(
        {
          order: updatedOrder,
          orderTotal
        },
        () => {
          localStorage.setItem("order", JSON.stringify(this.state.order));
          localStorage.setItem(
            "orderTotal",
            JSON.stringify(this.state.orderTotal)
          );
        }
      );
    } else {
      item.quantity = item.quantity + 1;
      const duplicateItem = [...this.state.order];
      let index = duplicateItem.indexOf(item);
      duplicateItem[index] = item;
      this.setState(
        {
          order: duplicateItem,
          orderTotal
        },
        () => {
          localStorage.setItem("order", JSON.stringify(this.state.order));
          localStorage.setItem(
            "orderTotal",
            JSON.stringify(this.state.orderTotal)
          );
        }
      );
    }
    // else {
    //   axios({
    //     method: "POST",
    //     url: "http://localhost:8080/restaurant/" + restaurantId,
    //     data: {
    //       restaurantId
    //     }
    //   })
    //     .then(result => {
    //       console.log(result);
    //       this.setState({
    //         activeGroup: [result.data.group]
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
    // axios({
    //   method: "POST",
    //   url:
    //     "http://localhost:8080/restaurant/" + restaurantId + "/" + menuItemId,
    //   data: {
    //     userId,
    //     menuItemId,
    //     restaurantId,
    //     groupFound
    //   }
    // })
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       order: result.data.order,
    //       activeGroup: [result.data.group]
    //     });
    //   })
    //   .then(result => {
    //     this.fetchCart(item);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  fetchCart = item => {
    const restaurantId = this.props.match.params.restaurantId;
    const groupId = this.state.activeGroup[0].id;
    const menuItemId = item.id;
    const userId = localStorage.getItem("userId");
    // axios
    //   .get(
    //     "http://localhost:8080/restaurant/" + restaurantId + "/" + menuItemId,
    //     {
    //       params: {
    //         groupId,
    //         userId,
    //         restaurantId
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       itemsInCart: result.data.order.menu_items,
    //       totalPrice: result.data.totalPrice
    //     });
    //   });
  };

  render() {
    const userType = JSON.parse(localStorage.getItem("userType"));
    const userId = JSON.parse(localStorage.getItem("userId"));

    if (!this.state.isLoaded) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else {
      const { restaurant } = this.state;
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <Breadcrumb>
                  <BreadCrumb.Item href="/">Home</BreadCrumb.Item>
                  <BreadCrumb.Item href="/restaurants">
                    All Restaurants
                  </BreadCrumb.Item>
                  <BreadCrumb.Item
                    href={`/restaurant/${this.props.match.params.restaurantId}`}
                  >
                    {restaurant[0].name}
                  </BreadCrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row>
              <Col>
                <RestaurantInfoHeader
                  name={restaurant[0].name}
                  address={restaurant[0].address}
                />
              </Col>
            </Row>
            {userType === "restaurant" && (
              <Row>
                <Col>
                  <Link
                    to={`/restaurant/${userId}/menu-item-form`}
                    className="restlandingContainer__content__link restlandingContainer__content--btn"
                  >
                    Add a new menu item
                  </Link>
                </Col>
              </Row>
            )}
            <Row>
              <Col>
                <Container>
                  {restaurant[0].menu_items.map(item => {
                    const { name, id, picture, description, price } = item;
                    return (
                      <Row key={id}>
                        <Col>
                          <MenuItem
                            name={name}
                            key={id}
                            id={id}
                            picture={picture}
                            description={description}
                            price={price}
                            item={item}
                            addMenuItem={this.addMenuItem}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                </Container>
              </Col>
              {userType === "user" && (
                <Col lg={3}>
                  <SideCart
                    itemsInCart={this.state.itemsInCart}
                    restaurant={this.state.restaurant}
                    orderTotal={this.state.orderTotal}
                    order={this.state.order}
                  />
                </Col>
              )}
            </Row>
          </Container>
          <div>
            {/* <Filter /> */}
            {/* <Footer /> */}
          </div>
        </div>
      );
    }
  }
}

export default RestaurantDetailsPage;
