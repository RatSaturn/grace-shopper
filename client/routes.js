import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllBooks,
  SingleBook,
  BooksByGenre,
  Checkout,
  ReviewOrder,
  StripeCheckout,
  LandingPage,
  Cart,
  AllStaffs,
  SingleStaff
} from './components'
import {me} from './store'
import {Elements} from 'react-stripe-elements'
// import LandingPage from '/Users/sy/Documents/grace-shopper/client/components/landing-page/landing-page.js'
// import Cart from '/Users/sy/Documents/grace-shopper/client/components/Cart.js'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/allBooks" component={AllBooks} />
        <Route exact path="/genres/:genre" component={BooksByGenre} />
        <Route exact path="/allbooks/:bookId" component={SingleBook} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/order-review" component={ReviewOrder} />
        <Route exact path="/allStaffs" component={AllStaffs} />
        <Route exact path="/allStaffs/:staffId" component={SingleStaff} />
        <Elements>
          <Route exact path="/stripe-checkout" component={StripeCheckout} />
        </Elements>

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
