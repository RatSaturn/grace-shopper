import axios from 'axios'
import store from './index'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []
/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = ({bookId, quantity}) => ({
  type: UPDATE_CART,
  bookId,
  quantity
})
const addToCart = ({bookId, quantity, book}) => ({
  type: ADD_TO_CART,
  bookId,
  book,
  quantity
})
const removeFromCart = ({bookId, quantity, book}) => ({
  type: REMOVE_FROM_CART,
  bookId,
  book,
  quantity
})
/**
 * THUNK CREATORS
 */
export const getCartFromServer = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/cart')
    dispatch(getCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

export const updateCartOnServer = bookInfo => async dispatch => {
  try {
    const {bookId, quantity} = bookInfo

    if (bookInfo.book) {
      dispatch(addToCart(bookInfo))
    } else if (!bookInfo.quantity) {
      dispatch(removeFromCart(bookInfo))
    } else {
      dispatch(updateCart(bookInfo))
    }
    await axios.post('/api/orders/cart/update', {bookId, quantity})
    return 'done'
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  const bookInCart = state.find(book => book.id === action.bookId)
  const newState = state.filter(book => book.id !== action.bookId)
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      bookInCart.booksForOrder.quantity = action.quantity
      newState.push(bookInCart)
      return newState
    case ADD_TO_CART:
      if (bookInCart) {
        bookInCart.booksForOrder.quantity += 1
        newState.push(bookInCart)
      } else {
        newState.push(action.book)
      }
      return newState
    case REMOVE_FROM_CART:
      return newState
    default:
      return state
  }
}
