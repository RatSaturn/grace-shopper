import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
    const {email} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <ul>{orders.map(order => <li>Order Date: {order.updateAt}</li>)}</ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    orders: state.allOrders
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
