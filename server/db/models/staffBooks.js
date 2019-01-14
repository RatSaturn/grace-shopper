const Sequelize = require('sequelize')
const db = require('../db')

const StaffBooks = db.define('staffBooks', {
  available: {
    type: Sequelize.STRING,
    defaultValue: 'yes'
  }
})

module.exports = StaffBooks
