const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./book')

const BooksForOrder = db.define('booksForOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

BooksForOrder.findOrders = async function(id) {
  const orders = await BooksForOrder.findAll({
    where: {orderId: id},
    include: [{model: Book}]
  })

  return orders
}
module.exports = BooksForOrder
