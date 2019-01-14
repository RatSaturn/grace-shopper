import React, {Component} from 'react'
import AcceptPayment from './AcceptPayment'
import {Elements, StripeProvider} from 'react-stripe-elements'

class StripeCheckout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_PqdBTVeeLsNk0o9T45hOEe65">
        <div className="example">
          <h1>Checkout</h1>
          <Elements>
            <AcceptPayment />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default StripeCheckout