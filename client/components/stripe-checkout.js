import React, {Component} from 'react'
import AcceptPayment from './accept-payment'
import {Elements, StripeProvider} from 'react-stripe-elements'

class StripeCheckout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_PqdBTVeeLsNk0o9T45hOEe65">
        <div className="checkout">
          <Elements>
            <AcceptPayment />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default StripeCheckout
