import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookFromApi, updateCartOnServer} from '../store'

export class SingleBook extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind()
  }
  async componentDidMount() {
    const id = this.props.match.params.bookId
    try {
      await this.props.getSingleBookFromApi(id)
    } catch (err) {
      console.error(err)
    }
  }

  async handleClick() {
    await this.props.updateCartOnServer({
      bookId: this.props.singleBook.id,
      quantity: 1
    })
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
        <li>
          <button type="button" onClick={this.handleClick()}>
            Add To Cart
          </button>
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
    },
    updateCartOnServer(bookInfo) {
      dispatch(updateCartOnServer(bookInfo))
    }
  }
}
export default connect(mapState, mapDispatch)(SingleBook)
