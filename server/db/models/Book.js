const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  subtitle: {
    type: Sequelize.STRING
  },
  authors: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  languange: {
    type: Sequelize.STRING,
    defaultValue: 'en'
  },
  publisher: {
    type: Sequelize.STRING
  },
  publishedDate: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  pageCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  currencyCode: {
    type: Sequelize.STRING,
    defaultValue: 'USD'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://www.surprisingdiscoveries.com/uploads/3/2/2/1/32211241/4591772_orig.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      min: 0
    }
  }
})

module.exports = Book
