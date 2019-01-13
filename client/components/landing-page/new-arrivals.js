import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBooksFromApi} from '/Users/sy/Documents/grace-shopper/client/store'
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
    return <BookView books={this.props.books} />
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
