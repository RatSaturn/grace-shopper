import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOrdersFromApi} from '../store'
/**
 * COMPONENT
 */
class UserHome extends Component {
  async componentDidMount() {
    try {
      console.log('UserHome did mount')
      await this.props.getOrdersFromApi()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {email, orders} = this.props
    console.log(orders)

    return (
      <div>
        <h3>Welcome, {email}</h3>
        {!orders[0] ? null : (
          <div>
            <h4>Order history:</h4>
            <ul>
              {orders.map(order => {
                if (!order.pending) {
                  return (
                    <li key={order[0].id}>
                      Order Date: {String(order[0].updatedAt).slice(0, 10)}
                      <ul>
                        <li>
                          Number of books:
                          {order[1].reduce(
                            (quantity, book) =>
                              quantity + book.booksForOrder.quantity,
                            0
                          )}
                        </li>
                        <li>
                          Total cost: {`$`}
                          {order[1].reduce(
                            (total, book) =>
                              total +
                              book.booksForOrder.quantity *
                                book.booksForOrder.price,
                            0
                          ) / 100}
                        </li>
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  orders: state.orders,
  email: state.user.email
})

const mapDispatch = {
  getOrdersFromApi
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
