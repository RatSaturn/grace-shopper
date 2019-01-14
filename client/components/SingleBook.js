import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleBookFromApi,
  updateCartOnServer,
  getCartFromServer
} from '../store'

export class SingleBook extends Component {
  async componentDidMount() {
    const id = this.props.match.params.bookId
    try {
      await this.props.getSingleBookFromApi(id)
      await this.props.getCartFromServer()
    } catch (err) {
      console.error(err)
    }
  }

  // async handleClick() {
  //   await this.props.updateCartOnServer({
  //     bookId: this.props.singleBook.id,
  //     quantity: 1
  //   })
  // }
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
          <button
            type="button"
            onClick={() =>
              this.props.updateCartOnServer({
                bookId: this.props.singleBook.id,
                quantity: 1,
                book: singleBook,
                alreadyThere: this.props.cart.length
              })
            }
          >
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
    singleBook: state.singleBook,
    cart: state.cart
  }
}
const mapDispatch = dispatch => ({
  getSingleBookFromApi: id => dispatch(getSingleBookFromApi(id)),
  updateCartOnServer: bookInfo => dispatch(updateCartOnServer(bookInfo)),
  getCartFromServer: () => dispatch(getCartFromServer())
})
export default connect(mapState, mapDispatch)(SingleBook)
