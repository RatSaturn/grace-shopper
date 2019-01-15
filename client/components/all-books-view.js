import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBooksFromApi} from '../store'
import BookView from './landing-page/book-view'
import HeroComponent from './landing-page/hero-component'
import StaffPicks from './landing-page/StaffPicks'

class AllBooks extends Component {
  async componentDidMount() {
    try {
      await this.props.getBooksFromApi()
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <div>
        <HeroComponent />
        <BookView books={this.props.books} expanded="true" />
        <StaffPicks />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    books: state.books
  }
}

const mapDispatch = dispatch => {
  return {
    getBooksFromApi() {
      dispatch(getBooksFromApi())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
