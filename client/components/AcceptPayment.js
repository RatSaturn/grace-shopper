import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {completeOrderOnServer} from '../store'
import {connect} from 'react-router-dom'

class AcceptPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }
    this.submit = this.submit.bind(this)
  }
  async submit() {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })
    // await this.props.completeOrderOnServer()

    if (response.ok) this.setState({complete: true})
  }

  render() {
    if (this.state.complete) return <h1>Your Purchase is Complete!</h1>
    return (
      <div className="checkout">
        <p>
          To Complete Your Purchase, please enter your payment information
          below:
        </p>
        <CardElement />

        <button onClick={this.submit} type="button">
          Submit
        </button>
      </div>
    )
  }
}

// const mapDispatch = dispatch => ({
//   completeOrderOnServer: () => dispatch(completeOrderOnServer())
// })

export default injectStripe(AcceptPayment)
