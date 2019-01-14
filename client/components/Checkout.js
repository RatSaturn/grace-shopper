import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const states = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY'
]

export class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.displayPrice = this.displayPrice.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  displayPrice(price) {
    let result = price.toString().split('')
    result.splice(result.length - 2, 0, '.')
    return result
  }

  calculateTotal(cart) {
    const displayTotal = cart
      .reduce((accum, book) => {
        return accum + book.price * book.booksForOrder.quantity
      }, 0)
      .toString()
      .split('')
    displayTotal.splice(displayTotal.length - 2, 0, '.')
    return displayTotal
  }

  handleSubmit(event) {
    event.preventDefault()
    const shippingData = {
      street: event.target.street.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zipcode: event.target.zipcode.value
    }
    console.log(shippingData)
    this.setState({redirect: 'true'})
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="./stripe-checkout" />
    }
  }

  render() {
    return (
      <div id="checkout-page">
        {this.renderRedirect()}
        <div id="order-review">
          <h3>Review Your Order</h3>
          <div id="order-review-list">
            {this.props.cart.map(book => {
              return (
                <div className="order-review-item" key={book.id}>
                  <div className="order-review-item-img">
                    <img src={book.imageUrl} />
                  </div>
                  <div className="order-review-item-info">
                    <p>{book.title}</p>
                    <p>{book.authors[0]}</p>
                  </div>
                  <div className="order-review-item-price">
                    <p>{book.booksForOrder.quantity}</p>
                    <p>{this.displayPrice(book.price)}</p>
                  </div>
                </div>
              )
            })}
            <h4>Total: {this.calculateTotal(this.props.cart)}</h4>
          </div>
        </div>
        <div id="shipping-form">
          <h3>Shipping Information</h3>

          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="street">
                <small>Street: </small>
              </label>
              <input name="street" type="text" />
            </div>
            <div>
              <div>
                <label htmlFor="city">
                  <small>City: </small>
                </label>
                <input name="city" type="text" />
              </div>
              <div>
                <label htmlFor="state">State:</label>{' '}
                <select id="state-dropdown" name="state">
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="zipcode">
                  <small>Zipcode: </small>
                </label>
                <input name="zipcode" type="text" />
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

export default connect(mapState)(Checkout)
