import React from 'react'
import {Link} from 'react-router-dom'

const BookComponent = props => {
  const {id, imageUrl, title, authors, price} = props.book

  return (
    <div>
      <img src={imageUrl} />
      <p>
        <Link exact to={`/allbooks/${id}`}>
          {title}
        </Link>
      </p>

      <p>{authors.map(author => <div key={author}>{author}</div>)}</p>
      <p>${price}</p>
    </div>
  )
}

export default BookComponent
