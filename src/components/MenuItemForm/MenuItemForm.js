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

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleForm = event => {
    event.preventDefault();
    const url = process.env.REACT_APP_URL;
    // axios
    //   .post(`${url}/restaurants/:id/menu-items`, this.state)
    //   .then(response => {
    //     console.log(response);
    //     this.props.history.push("/restaurants/:id");
    //   })
    //   .catch(error => {
    //     //this.props.showErrorMessage(error.message);
    //     this.props.showErrorMessage("An error occured while adding your item. Please try again...");
    //   });
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
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formGroupDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Describe your menu item..."
                onChange={this.inputChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPicture">
              <Form.Label>Image</Form.Label>
              <Form.Control name="image" type="file" />
            </Form.Group>
            <Form.Group controlId="formGroupPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                placeholder="Price of your menu item"
              />
            </Form.Group>
            <Button variant="primary" onClick={this.formHandler} type="submit">
              Create item
            </Button>
          </fieldset>
        </Form>
      </div>
    );
  }
}

export default MenuItemForm;
