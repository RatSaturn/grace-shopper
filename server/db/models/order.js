const Sequelize = require('sequelize')
const db = require('../db')
const BooksForOrders = require('./booksForOrders')

const Order = db.define('order', {
  pending: Sequelize.BOOLEAN
})

module.exports = Order

Order.findOrders = async function(id) {
  const orders = await BooksForOrders.findAll({
    where: {orderId: id}
  })
  const orderInstance = await Order.findById(id)
  const books = await orderInstance.getBooks()

  return [orders, books]
}

/*
Order.findOrder(id)
  take order id (which is unique instance of somebody creating a cart), look in BooksForOrder, return array of objects with all books associated with order ID


Order.getAll()
  load all orders in Order table, with associated books eager-loaded

*/
