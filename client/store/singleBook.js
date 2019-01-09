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
  author: 'J.K. Rowling',
  imageUrl:
    'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwifwd64z-HfAhUvWN8KHUJaB20QjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0KQnWmZUhYE6Xe7O-A2Si4&ust=1547154943916326',
  price: 19.95,
  format: 'Hardcover'
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
