/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AllBooks} from './AllBooks'
export {default as SingleBook} from './SingleBook'
export {default as Cart} from './Cart'
export {Login, Signup} from './auth-form'
export {default as Checkout} from './Checkout'
export {default as StripeCheckout} from './StripeCheckout'
export {default as AllStaffs} from './AllStaffs'
export {default as SingleStaff} from './SingleStaff'
