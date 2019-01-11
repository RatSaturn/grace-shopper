// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getCartFromServer} from '../store'

// export class Cart extends Component {
//   async componentDidMount() {
//     try {
//       await this.props.getCartFromServer()
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   render() {
//     console.log(this.props.books)
//     return (
//       <div>
//         <center>
//           <h1>Books In Your Cart</h1>
//         </center>
//         {/* <div className="allbookscontainer">
//           {this.props.books.map(book => (
//             <BookComponent
//               className="singleBookContainer"
//               key={book.id}
//               book={book}
//             />
//           ))}
//         </div> */}
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     cart: state.cart
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getCartFromServer() {
//       dispatch(getCartFromServer())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)
