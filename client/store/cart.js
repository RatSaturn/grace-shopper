import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []
/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const updateCart = cart => ({type: UPDATE_CART, cart})

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

export const updateCartOnServer = bookUpdate => async dispatch => {
  try {
    const res = await axios.post('/api/orders/cart/update', bookUpdate)
    dispatch(updateCart(res.data))
    return 'done'
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case UPDATE_CART:
      return action.cart
    default:
      return state
  }
}
