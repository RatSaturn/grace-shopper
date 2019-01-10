import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBookFromApi} from '../store'

export class SingleBook extends Component {
  async componentDidMount() {
    const id = this.props.match.params.bookId
    try {
      await this.props.getSingleBookFromApi(id)
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    const singleBook = this.props.singleBook
    return (
      <div className="container">
        <div className="row">
          <div className="col">Book Image</div>
          <div className="col">
            <div>{singleBook.title}</div>
            <div>
              {singleBook.authors.map(author => (
                <div key={author}>{author}</div>
              ))}
            </div>
            <div className="row">
              <div className="col">Price</div>
              <div className="col">Genre</div>
            </div>
            <div>Description</div>
            <div className="row">
              <div className="col">Amount</div>
              <div className="col">Add to Cart</div>
              <div className="col">Wish List</div>
            </div>
          </div>
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
