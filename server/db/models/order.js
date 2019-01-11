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
