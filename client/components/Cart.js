import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartFromServer} from '../store'
import CartItem from './CartItem'
import history from '../history'
import Grid from '@material-ui/core/Grid'

export class Cart extends Component {
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
              <Grid
                container
                spacing={16}
                style={{paddingLeft: '15%'}}
                direction="column"
                alignItems="stretch"
                justify="space-between"
                alignContent="stretch"
              >
                {this.props.cart.map(book => {
                  if (book.booksForOrder.quantity) {
                    return (
                      <Grid item xs={12} sm={6} lg={4} xl={12}>
                        <CartItem book={book} key={book.title} />
                      </Grid>
                    )
                  }
                })}{' '}
              </Grid>
            </div>
            <div className="cart-total">
              <div>
                <center>
                  <h3>Total: ${displayTotal}</h3>{' '}
                  <button
                    type="button"
                    onClick={() => history.push('/checkout')}
                  >
                    Checkout
                  </button>
                </center>
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
