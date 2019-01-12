/*thumbnail       title             price           quantity
                  author
*/

import React from 'react'
import {updateCartOnServer} from '../store'
import {connect} from 'react-redux'

const CartItem = props => {
  const {imageUrl, title, author, price, id} = props.book

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
          <select
            id="quantity-dropdown"
            onChange={event =>
              props.updateCartOnServer({
                bookId: id,
                quantity: event.target.value
              })
            }
          >
            {loop.map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() =>
              props.updateCartOnServer({
                bookId: id,
                quantity: 0
              })
            }
          >
            Remove Item
          </button>
        </div>
      </td>
    </tr>
  )
}

const mapDispatch = dispatch => {
  return {
    updateCartOnServer(bookUpdate) {
      dispatch(updateCartOnServer(bookUpdate))
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
