import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromServer} from '../store'
import CartItem from './CartItem'

export class Cart extends Component {
  async componentDidMount() {
    try {
      await this.props.getCartFromServer()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const displayTotal = this.props.cart
      .reduce((accum, book) => {
        return accum + book.price * book.booksForOrder.quantity
      }, 0)
      .toString()
      .split('')
    displayTotal.splice(displayTotal.length - 2, 0, '.')

    return (
      <div>
        <center>
          <h1>Books In Your Cart</h1>
        </center>
        {this.props.cart.length ? (
          <div id="cart-not-empty">
            <div className="items-in-cart">
              <table>
                <th>{}</th>
                <th>{}</th>
                <th>Price</th>
                <th>Quantity</th>
                {this.props.cart.map(book => {
                  if (book.booksForOrder.quantity) {
                    return <CartItem book={book} key={book.title} />
                  }
                })}
              </table>
            </div>
            <div className="cart-total">
              <div>
                <h4>Total: ${displayTotal}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div id="empty-cart">
            <br />
            <br />
            <center>
              <h3>Your cart is empty.</h3>
            </center>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCartFromServer() {
      dispatch(getCartFromServer())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
