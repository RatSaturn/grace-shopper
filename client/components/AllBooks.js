import React from 'react'
import BookComponent from './BookComponent'

const dummyBooks = [
  {
    id: 0,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf',
    author: 'Anonymous',
    price: '$1.00',
    format: 'Paperback'
  },
  {
    id: 1,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf 2',
    author: 'Anon',
    price: '$3.00',
    format: 'Hardback'
  },
  {
    id: 2,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf 2',
    author: 'Anon',
    price: '$3.00',
    format: 'Hardback'
  },
  {
    id: 3,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf 2',
    author: 'Anon',
    price: '$3.00',
    format: 'Hardback'
  },
  {
    id: 4,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf 2',
    author: 'Anon',
    price: '$3.00',
    format: 'Hardback'
  },
  {
    id: 5,
    img:
      'http://shopbitsy.herokuapp.com/assets/smurf-35b9e13d6e0564c2cab1cadc5341fdeb7faed2a67e712276563890f3d51f4d42.jpg',
    title: 'The Littlest Elf 2',
    author: 'Anon',
    price: '$3.00',
    format: 'Hardback'
  }
]

const AllBooks = () => {
  return (
    <div>
      <center>
        <h1>All Books</h1>
      </center>
      <div className="allbookscontainer">
        {dummyBooks.map(book => (
          <BookComponent
            className="singleBookContainer"
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </div>
  )
}

export default AllBooks
