import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookFromApi} from '../store'
class SingleBook extends Component {
  async componentDidMount() {
    const id = this.props.match.params.bookId
    console.log(id)
    try {
      await this.props.getSingleBookFromApi(id)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const singleBook = this.props.singleBook
    return (
      <ul>
        <img src={singleBook.imageUrl} />
        <li>{singleBook.title}</li>
        <li>
          <ul>
            {singleBook.authors
              ? singleBook.authors.map(author => <li key={author}>{author}</li>)
              : undefined}
          </ul>
        </li>
        <li>{singleBook.genre ? singleBook.genre : 'No genre'}</li>
        <li>
          {singleBook.description ? singleBook.description : 'No description'}
        </li>
      </ul>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleBook: state.singleBook
  }
}
const mapDispatch = dispatch => {
  return {
    getSingleBookFromApi(id) {
      dispatch(getSingleBookFromApi(id))
    }
  }
}
export default connect(mapState, mapDispatch)(SingleBook)
