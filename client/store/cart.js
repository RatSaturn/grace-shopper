import axios from 'axios'

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

const updateCart = ({quantity, currentBook, bookId}) => ({
  type: UPDATE_CART,
  quantity,
  book: currentBook,
  bookId
})
const addToCart = ({quantity, bookToSend, bookId}) => ({
  type: ADD_TO_CART,
  book: bookToSend,
  quantity,
  bookId
})
const removeFromCart = ({quantity, book, bookId}) => ({
  type: REMOVE_FROM_CART,
  book,
  quantity,
  bookId
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
    if (bookInfo.alreadyThere) {
      await axios.post('/api/orders/cart/update', {
        bookId,
        quantity: quantity + bookInfo.alreadyThere.booksForOrder.quantity
      })
      dispatch(addToCart(bookInfo))
    } else {
      const {data} = await axios.post('/api/orders/cart/update', {
        bookId,
        quantity
      })
      if (bookInfo.book) {
        const bookToSend = data.find(book => book.id === bookId)
        dispatch(addToCart({bookId, quantity, bookToSend}))
      } else if (!quantity) {
        dispatch(removeFromCart(bookInfo))
      } else {
        const {currentBook} = bookInfo
        dispatch(updateCart({bookId, quantity, currentBook}))
      }
    }

    return 'done'
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  let copyOfBook
  let bookIndex
  if (state.length) {
    bookIndex = state.findIndex(book => {
      return book.id === action.bookId
    })

    copyOfBook = {...state[bookIndex]}
  }
  const newState = state.filter(book => book.id !== action.bookId)
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      copyOfBook.booksForOrder.quantity = action.quantity
      newState.splice(bookIndex, 0, copyOfBook)
      return newState
    case ADD_TO_CART:
      if (bookIndex !== -1) {
        copyOfBook.booksForOrder.quantity += 1
        newState.splice(bookIndex, 0, copyOfBook)
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
