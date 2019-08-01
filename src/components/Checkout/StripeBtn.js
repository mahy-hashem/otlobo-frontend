import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Redirect } from "react-router-dom";

class StripeBtn extends React.Component {
  state = {
    redirect: false,
    paymentVerified: null
  };
  onToken = token => {
    const restaurantId = this.props.restaurantId;
    const userId = localStorage.getItem("userId");
    const timeframe = this.props.timeframe;
    const orderItems = this.props.orderItems;
    console.log(orderItems);
    const body = {
      amount: this.props.orderTotal,
      token: token,
      restaurantId,
      userId,
      timeframe,
      orderItems
    };

    axios
      .post(
        "http://localhost:8080/restaurant/" + restaurantId + "/checkout/charge",
        body
      )
      .then(result => {
        console.log(result);
        if (result.data.completed === true) {
          this.setState({
            redirect: true,
            paymentVerified: true
          });
        }
      })
      .catch(error => {
        console.log("Payment Error: ", error.response);
        if (
          !error ||
          error.response === undefined ||
          error.response.data.completed === false ||
          !error.response.data.completed ||
          !error.response
        ) {
          this.setState({
            redirect: false,
            paymentVerified: false
          });
        }
      });
  };
  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={`/userApp/restaurant/${this.props.restaurantId}/checkout/success`}
        />
      );
    }
    return (
      <div>
        {this.state.paymentVerified === false && (
          <h1>Something went wrong, please try again!</h1>
        )}
        <StripeCheckout
          label="Pay for your order" //Component button text
          name="Otlobo" //Modal Header
          description="Order food today."
          panelLabel="Complete payment" //Submit button in modal
          amount={this.props.orderTotal} //Amount in cents $9.99
          token={this.onToken}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          image="" //Pop-in header image
          billingAddress={false}
        />
      </div>
    );
  }
}
export default StripeBtn;
