import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'

// const GET_BOOKS_ADDED_TO_CART = 'GET_BOOKS_ADDED_TO_CART'

/**
 * INITIAL STATE
 */
const allBooks = []

/**
 * ACTION CREATORS
 */
const getBooks = books => ({type: GET_BOOKS, books})

// const getBooksAddedToCart = books => ({type: GET_BOOKS_ADDED_TO_CART, books})

/**
 * THUNK CREATORS
 */
export const getBooksFromApi = () => async dispatch => {
  try {
    const res = await axios.get('/api/books')
    dispatch(getBooks(res.data || allBooks))
  } catch (err) {
    console.error(err)
  }
}

// export const getBooksFromUserOrder = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/cart/??') //not yet sure how to request this without a route already setup
//     dispatch(getBooksAddedToCart(res.data))
//   } catch (err) {
//     console.log(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = allBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    // case GET_BOOKS_ADDED_TO_CART:
    //   return action.books
    default:
      return state
  }
}
