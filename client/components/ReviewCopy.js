import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export class ReviewOrder extends Component {
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
    this.setState({redirect: 'true'})
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="./stripe-checkout" />
    }
  }

  render() {
    return (
      <div id="order-review">
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
        <div id="confirm-purchase">
          <button type="submit" onClick={this.handleSubmit}>
            Proceed
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

export default connect(mapState)(ReviewOrder)
