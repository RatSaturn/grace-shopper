import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BOOKS = 'GET_BOOKS'

/**
 * INITIAL STATE
 */
const allBooks = []

/**
 * ACTION CREATORS
 */
const getBooks = books => ({type: GET_BOOKS, books})

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

/**
 * REDUCER
 */
export default function(state = allBooks, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
