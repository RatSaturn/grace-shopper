import React, {Component} from 'react'
import BookComponent from './BookComponent'
import {connect} from 'react-redux'
import {getBooksFromApi} from '../store'
import {BeatLoader} from 'react-spinners'

export class AllBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    try {
      await this.props.getBooksFromApi()
      this.setState({
        loading: false
      })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return (
      <div>
        <center>
          <h1>All Books</h1>
        </center>
        <div className="loader">
          <BeatLoader color="#708090" loading={this.state.loading} />
        </div>
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
