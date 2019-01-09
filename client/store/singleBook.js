import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
/**
 * INITIAL STATE
 */
const defaultBook = {
  id: 1,
  title: 'Harry Potter and the Goblet of Fire',
  author: 'J.K. Rowling'
}
/**
 * ACTION CREATORS
 */
const getSingleBook = singleBook => ({type: GET_SINGLE_BOOK, singleBook})
/**
 * THUNK CREATORS
 */
// export const getSingleBookFromApi = id => async dispatch => {
//   try {
//     // const res = await axios.get(`/api/books/${id}`)
//     dispatch(getSingleBook(/*res.data || */ defaultBook))
//   } catch (err) {
//     console.error(err)
//   }
// }
/**
 * REDUCER
 */
export default function(state = defaultBook, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.singleBook
    default:
      return state
  }
}
