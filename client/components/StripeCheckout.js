import React, {Component} from 'react'
import AcceptPayment from './AcceptPayment'
import {Elements} from 'react-stripe-elements'

class StripeCheckout extends Component {
  render() {
    return (
      <div className="checkout">
        <h1>Checkout</h1>
        <Elements>
          <AcceptPayment />
        </Elements>
      </div>
    )
  }
}

export default StripeCheckout
