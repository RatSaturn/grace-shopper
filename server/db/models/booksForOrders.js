const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = BooksForOrder
