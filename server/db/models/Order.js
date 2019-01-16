const Sequelize = require('sequelize')
const db = require('../db')
const BooksForOrders = require('./BooksForOrders')
const Book = require('./Book')

const Order = db.define('order', {
  pending: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  numberOfItems: Sequelize.INTEGER
})

module.exports = Order

Order.prototype.updateNumberOfItems = async function() {
  const booksOnOrder = await this.getBooks()
  await this.update({numberOfItems: booksOnOrder.length})
  //console.log(this)
}

Order.prototype.markCompleted = async function() {
  await this.update({pending: false})
}

Order.findSingleOrder = async function(id) {
  const orderInstance = await Order.findById(id)
  const bookInformation = await orderInstance.getBooks()
  return bookInformation
}

Order.findAllOrders = async function(userId) {
  const orders = await Order.findAll({
    //where: {userId, pending: false},
    where: {userId},
    attributes: ['id', 'updatedAt']
  })

  const allOrders = await Promise.all(
    orders.map(order => Order.findSingleOrder(order.id))
  )
  return allOrders.map((order, index) => [orders[index], order])
}

Order.updateOrderQuantity = async function(id, object) {
  const orderInstance = await Order.findById(id)
  const singleBook = await orderInstance.getBooks({where: {id: object.bookId}})

  if (singleBook.length === 0) {
    const newBook = await Book.findById(object.bookId)
    await BooksForOrders.create({
      orderId: id,
      bookId: object.bookId,
      quantity: object.quantity,
      price: newBook.price
    })
  } else if (!object.quantity) {
    const book = await Book.findById(object.bookId)
    await orderInstance.removeBook(book)
  } else {
    console.log('update book quantity to', object.quantity)
    const book = await BooksForOrders.findOne({
      where: {orderId: id, bookId: object.bookId}
    })
    await book.update({quantity: object.quantity})
  }
  orderInstance.updateNumberOfItems()
  return Order.findSingleOrder(id)
}
