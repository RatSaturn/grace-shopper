/*thumbnail       title             price           quantity
                  author
*/

import React from 'react'
import {updateCartOnServer} from '../store'
import {connect} from 'react-redux'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind()
  }

  async handleChange(event) {
    console.log(event)
    if (event.target.value) {
      await this.props.updateCartOnServer({
        bookId: this.props.book.id,
        quantity: event.target.value
      })
    } else {
      updateCartOnServer({
        bookId: this.props.book.id,
        quantity: 0
      })
    }
  }

  render() {
    const {imageUrl, title, author, price} = this.props.book

    const loop = [1, 2, 3, 4, 5, 6]
    const displayPrice = price.toString().split('')
    displayPrice.splice(displayPrice.length - 2, 0, '.')

    return (
      <tr>
        <td>
          <img src={imageUrl} alt={title} className="thumbnail" />
        </td>
        <td>
          <div className="title-author-cart-item">
            {title}
            {author}
          </div>
        </td>
        <td>${displayPrice}</td>
        <td>
          <div className="quantity-and-remove">
            <label htmlFor="quantity-limit">Quantity:</label>
            <select id="quantity-dropdown" onChange={this.handleChange}>
              {loop.map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => this.handleChange()}>
              Remove Item
            </button>
          </div>
        </td>
      </tr>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCartOnServer(bookInfo) {
      dispatch(updateCartOnServer(bookInfo))
    }
  }
}

export default connect(null, mapDispatch)(CartItem)

// return (
//   <div>
//     <img src={imageUrl} />
//     <p>
//       <Link exact to={`/allbooks/${id}`}>
//         {title}
//       </Link>
//     </p>

//     <p>{author}</p>
//     <p>${price}</p>
//     <p>{format}</p>
//   </div>
// )
