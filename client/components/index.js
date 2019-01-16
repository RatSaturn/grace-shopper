/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as SingleBook} from './single-book'
export {default as AllBooks} from './all-books-view'
export {default as BooksByGenre} from './books-by-genre-view'
export {Login, Signup} from './auth-form'
export {default as LandingPage} from './landing-page'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as StripeCheckout} from './stripe-checkout'
export {default as ReviewOrder} from './review-order'
export {default as AllStaffs} from './all-staff'
export {default as SingleStaff} from './single-staff'
export {default as Footer} from './footer'
