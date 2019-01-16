const Sequelize = require('sequelize')
const db = require('../db')

const Staff = db.define('staff', {
  name: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  contactUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Staff
