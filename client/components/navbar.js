import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SimpleMenu from './drop-down-menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
}

const Navbar = props => {
  const {handleClick, isLoggedIn, classes} = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <SimpleMenu />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" style={{textDecoration: 'none', color: '#FFF'}}>
              BookStack
            </Link>
          </Typography>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button color="inherit">
                <Link to="/" style={{textDecoration: 'none', color: '#FFF'}}>
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/cart"
                  style={{textDecoration: 'none', color: '#FFF'}}
                >
                  Cart
                </Link>
              </Button>

              <Button color="inherit">
                <a
                  href="#"
                  onClick={handleClick}
                  style={{textDecoration: 'none', color: '#FFF'}}
                >
                  Logout
                </a>
              </Button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}

              <Button color="inherit">
                <Link
                  to="/signup"
                  style={{textDecoration: 'none', color: '#FFF'}}
                >
                  Sign Up
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{textDecoration: 'none', color: '#FFF'}}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/cart"
                  style={{textDecoration: 'none', color: '#FFF'}}
                >
                  Cart
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
