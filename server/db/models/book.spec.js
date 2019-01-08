// Assertions
const chai = require('chai')
const expect = chai.expect
const db = require('../index')

// Models
const Book = db.model('book')

describe('Book model', () => {
  describe('Validations', () => {
    let book

    before(() => {
      book = Book.build()
    })

    it('requires `title`', async () => {
      book.author = 'Scott Peck'
      book.price = 10.99
      book.inventory = 2

      try {
        await book.validate()
        throw Error('validate succeeded but should have failed without `name`')
      } catch (err) {
        expect(err.message).to.contain('title')
      }
    })
  })
})
