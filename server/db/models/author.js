const Sequelize = require('sequelize')
const db = require('../db')

const Author = db.define('author', {
  name: Sequelize.STRING
})

module.exports = Author
