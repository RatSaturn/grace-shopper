import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBooksByGenreFromApi} from '../store'
import BookView from './landing-page/book-view'
import HeroComponent from './landing-page/hero-component'

class BooksByGenre extends Component {
  async componentDidMount() {
    try {
      await this.props.getBooksByGenreFromApi(this.props.match.params.genre)
    } catch (err) {
      console.error(err)
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.genre !== prevProps.match.params.genre) {
      try {
        await this.props.getBooksByGenreFromApi(this.props.match.params.genre)
      } catch (err) {
        console.error(err)
      }
    }
  }

  render() {
    return (
      <div>
        <HeroComponent />
        <BookView books={this.props.books} expanded="true" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    books: state.booksByGenre
  }
}

const mapDispatch = dispatch => {
  return {
    getBooksByGenreFromApi(genre) {
      dispatch(getBooksByGenreFromApi(genre))
    }
  }
}

export default connect(mapState, mapDispatch)(BooksByGenre)
