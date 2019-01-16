import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import books from './books'
import singleBook from './single-book'
import cart from './cart'
import booksByGenre from './books-by-genre'
import staffs from './staffs'
import singleStaff from './single-staff'
import orders from './orders'

const reducer = combineReducers({
  user,
  books,
  singleBook,
  cart,
  staffs,
  singleStaff,
  booksByGenre,
  orders
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './books'
export * from './single-book'
export * from './cart'
export * from './books-by-genre'
export * from './staffs'
export * from './single-staff'
export * from './orders'
