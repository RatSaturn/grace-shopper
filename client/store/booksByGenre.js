import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_BOOKS_BY_GENRE = 'GET_BOOKS_BY_GENRE'

/**
 * INITIAL STATE
 */
const booksByGenre = []

/**
 * ACTION CREATORS
 */
const getBooksByGenre = books => ({type: GET_BOOKS_BY_GENRE, books})

/**
 * THUNK CREATORS
 */

export const getBooksByGenreFromApi = genre => async dispatch => {
  console.log('dispatching getBooksByGenre')
  console.log(genre)
  try {
    const res = await axios.get(`/api/books/${genre}`)
    console.log(res)
    dispatch(getBooksByGenre(res.data || booksByGenre))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = booksByGenre, action) {
  switch (action.type) {
    case GET_BOOKS_BY_GENRE:
      return action.books
    default:
      return state
  }
}
