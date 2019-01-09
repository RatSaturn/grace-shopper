import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          BookStack
        </a>
        <div>
          <a className="navbar-brand" href="#">
            Login
          </a>
          <a className="navbar-brand" href="#">
            Sign Up
          </a>
          <a className="navbar-brand" href="#">
            Cart
          </a>
        </div>
      </div>
    </nav>
    <header className="jumbotron my-4">
      <h1 className="display-3">Welcome to BookStack!</h1>
      <p className="lead">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam,
        eligendi, in quo sunt possimus non incidunt odit vero aliquid similique
        quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
      </p>
      <a href="#" className="btn btn-primary btn-lg">
        Browse Our Catagories
      </a>
    </header>
    <div className="jumbotron my-3" />
    <div className="jumbotron my-3" />
    <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">
          Copyright © Your Website 2018
        </p>
      </div>
    </footer>
  </div>
)

{
  /* // const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <Link to="/">
//       <h1>Book Stack</h1>
//     </Link>

//     <nav> */
}
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//           <Link to="/signup">Cart</Link>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/signup">Cart</Link>
//         </div>
//       )}
//     </nav>
//     <DropdownButton title="Books" id="dropdown-basic">
//       <MenuItem eventKey="1">
//         <Link to="/allbooks">All Books</Link>
//       </MenuItem>
//       <MenuItem divider />
//       <MenuItem eventKey="2">Fantasy</MenuItem>
//     </DropdownButton>

//     <hr />
//   </div>
// )

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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
