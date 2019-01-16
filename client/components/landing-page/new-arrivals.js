import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBooksFromApi} from '../../store'
import BookView from './book-view'

class NewArrivals extends Component {
  async componentDidMount() {
    try {
      await this.props.getBooksFromApi()
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <BookView title="New Arrivals" books={this.props.books.slice(0, 5)} />
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

export default connect(mapState, mapDispatch)(NewArrivals)
