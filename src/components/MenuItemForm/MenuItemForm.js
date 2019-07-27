import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class MenuItemForm extends React.Component {
  state = {
    name: "",
    description: "",
    image: null,
    price: 0,
    restaurantId: "",
    token: ""
  };

  componentDidMount() {
    const restaurantId = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    this.setState({
      restaurantId,
      token
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
    let data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("file", image[0]);
    console.log(image);
    data.append("price", price);

    axios
      .post(`${url}/menuItems/${this.state.restaurantId}/add`, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: this.state.token
        }
      })
      .then(response => {
        console.log(response);
        this.props.history.push(`/app/menu/${this.state.restaurantId}`);
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

  handleImage = (input, value, files) => {
    console.log(input, value, files);
    this.setState(
      {
        image: files ? files[0] : value
      },
      () => console.log(this.state.image[0])
    );
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
                name="file"
                type="file"
                id="image"
                onChange={e => this.handleImage(e.target.value, e.target.files)}
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
            <Button
              className="customColor"
              onClick={this.handleForm}
              type="submit"
            >
              Create item
            </Button>
          </fieldset>
        </Form>
      </div>
    );
  }
}

export default MenuItemForm;
