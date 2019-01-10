import React, {Component} from 'react'
import BookComponent from './BookComponent'
import {connect} from 'react-redux'
import {getBooksFromApi} from '../store'

export class AllBooks extends Component {
  async componentDidMount() {
    try {
      await this.props.getBooksFromApi()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    console.log(this.props.books)
    return (
      <div>
        <center>
          <h1>All Books</h1>
        </center>
        <div className="allbookscontainer">
          {this.props.books.map(book => (
            <BookComponent
              className="singleBookContainer"
              key={book.id}
              book={book}
            />
          ))}
        </div>
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
