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

Order.updateOrderQuantity = async function(id, object) {
  const orderInstance = await Order.findById(id)
  const singleBook = await orderInstance.getBooks({where: {id: object.bookId}})

  if (singleBook.length === 0) {
    const newBook = await Book.findById(object.bookId)
    const newAssociation = await BooksForOrders.create({
      orderId: id,
      bookId: object.bookId,
      quantity: 1,
      price: newBook.price
    })
    return newAssociation
  }
  if (object.quantity === 0) {
    const book = await BooksForOrders.findOne({where: {bookId: object.bookId}})
    const removed = await orderInstance.removeBook(book)
    return removed
  } else {
    const book = await BooksForOrders.findOne({where: {bookId: object.bookId}})
    const newBook = await book.update({quantity: object.quantity})
    return newBook
  }
}
