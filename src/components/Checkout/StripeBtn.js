import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Redirect } from "react-router-dom";

class StripeBtn extends React.Component {
  state = {
    redirect: false
  };
  onToken = token => {
    const restaurantId = this.props.restaurantId;
    const userId = localStorage.getItem("userId");
    const body = {
      amount: this.props.totalPrice,
      token: token,
      restaurantId,
      userId
    };
    axios
      .post(
        "http://localhost:8080/restaurant/" + restaurantId + "/checkout/charge",
        body
      )
      .then(response => {
        console.log(response);
        this.setState({
          redirect: true
        });
      })
      .catch(error => {
        console.log("Payment Error: ", error);
      });
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/order-success" />;
    }
    return (
      <StripeCheckout
        label="Pay for your order" //Component button text
        name="Otlobo" //Modal Header
        description="Order food today."
        panelLabel="Complete payment" //Submit button in modal
        amount={this.props.totalPrice} //Amount in cents $9.99
        token={this.onToken}
        stripeKey={"pk_test_nKM3abPgU0LJR15gcvwt0Ctq00iuMGYppT"}
        image="" //Pop-in header image
        billingAddress={false}
      />
    );
  }
}
export default StripeBtn;
