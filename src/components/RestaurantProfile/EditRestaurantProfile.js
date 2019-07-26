import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class EditRestaurantProfile extends React.Component {
  state = {
    address: "",
    mobile: "",
    image: null,
    restaurant: {},
    restaurantId: "",
    token: ""
  };

  componentDidMount() {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    const restaurantId = restaurant.id;
    const token = JSON.parse(localStorage.getItem("token"));
    this.setState({
      restaurant,
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
    const { address, mobile, image } = this.state;
    let data = new FormData();
    data.append("address", address);
    data.append("mobile", mobile);
    data.append("file", image[0]);

    axios
      .post(`${url}/restaurant/${this.state.restaurantId}/profile`, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: this.state.token
        }
      })
      .then(response => {
        //console.log(response);
        this.props.history.push(`/profile`);
      })
      .catch(error => {
        //this.props.showErrorMessage(error.message);
        // this.props.showErrorMessage(
        //   "An error occured while adding your item. Please try again..."
        // );
        console.log(error);
      });
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

  handleClose = () => {
    this.props.history.push(`/profile`);
  };

  render() {
    return (
      <div className="form-container">
        <Form>
          <fieldset>
            <legend>Edit your profile!</legend>
            <Form.Group controlId="restaurantAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                value={this.state.restaurant.address}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="restaurantMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mobile"
                type="text"
                value={this.state.restaurant.mobile}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="restaurantPicture">
              <Form.Label>Image</Form.Label>
              <Form.Control
                name="file"
                type="file"
                id="image"
                onChange={e => this.handleImage(e.target.value, e.target.files)}
              />
            </Form.Group>
            <Button
              className="customColor"
              onClick={this.handleForm}
              type="submit"
            >
              Save
            </Button>
            <Button className="customColor" onClick={this.handleClose}>
              Cancel
            </Button>
          </fieldset>
        </Form>
      </div>
    );
  }
}

export default EditRestaurantProfile;
