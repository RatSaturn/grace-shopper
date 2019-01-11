const Sequelize = require('sequelize')
const db = require('../db')
const BooksForOrders = require('./booksForOrders')
const Book = require('./book')

const Order = db.define('order', {
  pending: Sequelize.BOOLEAN
})

module.exports = Order

Order.findSingleOrder = async function(id) {
  const orderInstance = await Order.findById(id)
  const bookInformation = await orderInstance.getBooks()
  return bookInformation
}

Order.findAllOrders = async function() {
  const orderIds = await Order.findAll({attributes: ['id']})

  const allOrders = await Promise.all(
    orderIds.map(orderId => Order.findSingleOrder(orderId.id))
  )
  return allOrders
}

// Order.update
/*
  Order.update(id, {order update object}) 
    update object will have bookId and quantity
    if quantity is 0, remove book from order
    otherwise, update quantity with quantity from object
    return updated order
*/

/*
Order.findOrder(id)
  take order id (which is unique instance of somebody creating a cart), look in BooksForOrder, return array of objects with all books associated with order ID


Order.getAll()
  load all orders in Order table, with associated books eager-loaded

*/

// Instance Method
// order.update(bookId, quantity)
// 	add to BooksForOrder (insert, delete, update entries)
// 	if quantity is 0, delete
