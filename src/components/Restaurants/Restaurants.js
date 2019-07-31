import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";

import "./Restaurants.scss";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import BreadCrumb from "react-bootstrap/Breadcrumb";

import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import RestaurantCard from "./RestaurantCard";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Filter from "../Filter/Filter";
import createSorter from "../../util/sort";
import createFilter from "../../util/filter";
import GenericPagination from "../GenericPagination/GenericPagination";

import { getLocalStorageItem } from "../../util/localStorage";
class Restaurants extends React.Component {
  state = {
    restaurants: [],
    sorters: [
      {
        property: "name",
        direction: "asc"
      }
    ],
    filters: [
      {
        property: "name",
        value: "b"
      }
    ]
  };

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = () => {
    const token = getLocalStorageItem("token");
    axios
      .get("http://localhost:8080/restaurants", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      .then(res => {
        this.setState(
          {
            restaurants: res.data.restaurants
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

  sortRestaurants = e => {
    // let sortedRestaurants = this.state.restaurants.sort(
    //   createSorter(...this.state.sorters)
    // );
    // this.setState({
    //   restaurants: sortedRestaurants
    // });
    const queryParamVal = e.target.value;
    const pageParamVal = this.props.match;
    //console.log(`page number ${this.props.query.page}`);
    axios
      .get("http://localhost:8080/restaurants/?sortBy=" + queryParamVal)
      .then(res => {
        this.setState({
          restaurants: res.data.restaurants
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  filterRestaurants = e => {
    // let filteredRestaurants = this.state.restaurants.filter(
    //   createFilter(...this.state.filters)
    // );
    // this.setState({
    //   restaurants: filteredRestaurants
    // });
    const queryParamVal = e.target.value;
    axios
      .get("http://localhost:8080/restaurants/?filter=" + queryParamVal)
      .then(res => {
        this.setState({
          restaurants: res.data.restaurants
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  nextPage = e => {
    const pageParamVal = e.target.value;
    axios
      .get("http://localhost:8080/restaurants/?page=" + pageParamVal)
      .then(res => {
        this.setState({
          restaurants: res.data.restaurants
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="restaurants-page-container">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadCrumb.Item href="/">Home</BreadCrumb.Item>
                <BreadCrumb.Item href="/userApp/restaurants">
                  All Restaurants
                </BreadCrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>All Restaurants</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Filter
                sortRestaurants={this.sortRestaurants}
                filterRestaurants={this.filterRestaurants}
                filters={this.state.filters}
                sorters={this.state.sorters}
              />
            </Col>
          </Row>
          <div className="restaurants-list-container mx-auto">
            <Row>
              <Switch>
                <Route path="/userApp/restaurants">
                  {this.state.restaurants.map(restaurant => {
                    const { id, name, address, image } = restaurant;
                    return (
                      <Col>
                        <RestaurantCard
                          key={id}
                          id={id}
                          name={name}
                          address={address}
                          image={`${process.env.REACT_APP_URL}/${image}`}
                        />
                      </Col>
                    );
                  })}
                </Route>
              </Switch>
            </Row>
          </div>
          <div className="filter-container" />
          {/* <GenericPagination /> */}
        </Container>
      </div>
    );
  }
}

export default Restaurants;
