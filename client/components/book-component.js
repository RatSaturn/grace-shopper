import React from 'react'
import {Link} from 'react-router-dom'

const BookComponent = props => {
  const {id, imageUrl, title, authors, price} = props.book
  const displayPrice = price.toString().split('')
  displayPrice.splice(displayPrice.length - 2, 0, '.')
  return (
    <div>
      <img src={imageUrl} />
      <p>
        <Link exact to={`/allbooks/${id}`}>
          {title}
        </Link>
      </p>

      {authors.map(author => <p key={author}>{author}</p>)}
      <p>${displayPrice}</p>
    </div>
  )
}

export default BookComponent
