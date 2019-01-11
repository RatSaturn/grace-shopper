// /*thumbnail       title             price           quantity
//                   author
// */

// import React from 'react'
// import {Link} from 'react-router-dom'
// import {getUpdatedCartFromServer} from '../store'

// class CartItem extends React.Component {
//   constructor() {
//     super()
//     this.state = {}
//     this.quantityMax = this.quantityMax.bind()
//   }

//   async componentDidMount() {}

//   quantityMax() {
//     const maxArray = []
//     for (let i = 1; i <= this.props.books.inventory; i++) {
//       maxArray.push(i)
//     }
//     return maxArray
//   }

//   handleUpdate() {}

//   render() {
//     const {id, imageUrl, title, author, price, format} = props.book
//     return (
//       <tr>
//         <td>
//           <img src={imageUrl} />
//         </td>
//         <td>
//           <div className="title-author-cart-item">
//             {title}
//             {author}
//           </div>
//         </td>
//         <td>${price}</td>
//         <td>
//           <label htmlFor="quantity-limit">Quantity:</label>
//           <select id="quantity dropdown">
//             {this.quantityMax().map(num => (
//               <option key={num} value={num.toString()}>
//                 num
//               </option>
//             ))}
//           </select>
//         </td>
//         <td>
//           Remove Button<button
//             type="button"
//             onClick={() => this.getUpdatedCartFromServer()}
//           >
//             Remove Item
//           </button>
//         </td>
//       </tr>
//     )
//   }
// }

// return (
//   <div>
//     <img src={imageUrl} />
//     <p>
//       <Link exact to={`/allbooks/${id}`}>
//         {title}
//       </Link>
//     </p>

//     <p>{author}</p>
//     <p>${price}</p>
//     <p>{format}</p>
//   </div>
// )

// export default CartItem
