const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pending: Sequelize.STRING,
  cookie: Sequelize.STRING
})

module.exports = Order
