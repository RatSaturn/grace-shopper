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
  try {
    const res = await axios.get(`/api/genres/${genre}`)
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
