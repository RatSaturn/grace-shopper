const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pending: Sequelize.BOOLEAN
})

module.exports = Order
