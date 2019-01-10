import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
/**
 * INITIAL STATE
 */
const singleBook = {}
/**
 * ACTION CREATORS
 */
const getSingleBook = singleBook => ({type: GET_SINGLE_BOOK, singleBook})
/**
 * THUNK CREATORS
 */
export const getSingleBookFromApi = id => async dispatch => {
  try {
    console.log(id)
    const res = await axios.get(`/api/books/${id}`)
    dispatch(getSingleBook(res.data || singleBook))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = singleBook, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.singleBook
    default:
      return state
  }
}
