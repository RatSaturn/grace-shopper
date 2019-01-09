const Sequelize = require('sequelize')
const db = require('../db')

const Genre = db.define('genre', {
  type: Sequelize.STRING
})

module.exports = Genre
