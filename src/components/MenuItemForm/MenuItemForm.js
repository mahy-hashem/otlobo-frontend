import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class MenuItemForm extends React.Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: 0
  };

  componentDidMount() {
    const restaurantId = JSON.parse(localStorage.getItem("userId"));
    this.setState({
      restaurantId
    });
  }

  handleInputChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      console.log(this.state.name)
    );
  };

  handleForm = event => {
    event.preventDefault();
    const url = process.env.REACT_APP_URL;
    const { name, description, price, image } = this.state;
    axios
      .post(`${url}/menuItems/${this.state.restaurantId}/add`, {
        name,
        description,
        price,
        image
      })
      .then(response => {
        console.log(response);
        this.props.history.push(`/restaurant/${this.state.restaurantId}`);
      })
      .catch(error => {
        //this.props.showErrorMessage(error.message);
        // this.props.showErrorMessage(
        //   "An error occured while adding your item. Please try again..."
        // );
        console.log(error);
      });
    console.log("handle menu item form");
  };

  render() {
    return (
      <div className="form-container">
        <Form>
          <fieldset>
            <legend>Add an item to your Menu!</legend>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name of new menu item"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Describe your menu item..."
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPicture">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="image"
                type="text"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                placeholder="Price of your menu item"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.handleForm} type="submit">
              Create item
            </Button>
          </fieldset>
        </Form>
      </div>
    );
  }
}

export default MenuItemForm;
