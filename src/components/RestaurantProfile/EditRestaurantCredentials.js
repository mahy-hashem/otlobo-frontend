import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

class EditRestaurantCredentials extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: null,
    restaurantId: "",
    token: ""
  };

  componentDidMount() {
    const restaurantId = JSON.parse(localStorage.getItem("userId"));
    const token = JSON.parse(localStorage.getItem("token"));
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
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword === confirmPassword) {
      axios
        .post(
          `${url}/restaurant/${this.state.restaurantId}`,
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: this.state.token
            }
          }
        )
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
    } else {
      console.log("passwords don't match");
    }
  };

  handleClose = () => {
    this.props.history.push(`/profile`);
  };

  render() {
    return (
      <div className="form-container">
        <Form>
          <fieldset>
            <legend>Change password!</legend>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                name="oldPassword"
                type="password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                name="newPassword"
                type="password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                onChange={this.handleInputChange}
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

export default EditRestaurantCredentials;
