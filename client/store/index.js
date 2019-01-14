import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import books from './books'
import singleBook from './singleBook'
import cart from './cart'
import booksByGenre from './booksByGenre'

import staffs from './staffs'
import singleStaff from './singleStaff'

const reducer = combineReducers({
  user,
  books,
  singleBook,
  cart,
  staffs,
  singleStaff,
  booksByGenre
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './books'
export * from './singleBook'
export * from './cart'
export * from './booksByGenre'
export * from './staffs'
export * from './singleStaff'
