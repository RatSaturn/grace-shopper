/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as SingleBook} from './book-views/single-book'
export {default as AllBooks} from './book-views/all-books-view'
export {default as BooksByGenre} from './book-views/books-by-genre-view'
export {Login, Signup} from './auth-form'
export {default as LandingPage} from './landing-page'
export {default as Cart} from './payment/cart'
export {default as Checkout} from './payment/checkout'
export {default as StripeCheckout} from './payment/stripe-checkout'
export {default as ReviewOrder} from './payment/review-order'
export {default as AllStaffs} from './staff-views/all-staff'
export {default as SingleStaff} from './staff-views/single-staff'
export {default as Footer} from './footer'
