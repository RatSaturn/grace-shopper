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
      console.log('staffId: ', staffId)
      await this.props.getSingleStaffFromApi(staffId)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {email} = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
