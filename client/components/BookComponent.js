import React from 'react'
import {Link} from 'react-router-dom'

const BookComponent = props => {
  const {id, img, title, author, price, format} = props.book

  return (
    <div>
      <img src={img} />
      <p>
        <Link exact to={`/allbooks/${id}`}>
          {title}
        </Link>
      </p>
      <p>{author}</p>
      <p>{price}</p>
      <p>{format}</p>
    </div>
  )
}

export default BookComponent
