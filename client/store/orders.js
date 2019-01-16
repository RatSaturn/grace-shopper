import axios from 'axios'

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'

//INITIAL STATE
const allOrders = []

//ACTION CREATORS
const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

//THUNK CREATORS
export const getOrdersFromApi = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/')
    dispatch(getOrders(data || allOrders))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
export default function(state = allOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
