// Assertions
const chai = require('chai')
const expect = chai.expect
const db = require('../../index')

// Models
const Book = db.model('book')

describe('Book model', () => {
  describe('Validations', () => {
    let book

    beforeEach(() => {
      book = Book.build()
    })

    it('requires `title`', async () => {
      //book.title = 'Harry Potter'
      book.author = 'Scott Peck'
      book.price = 10.99
      book.inventory = 2

      try {
        await book.validate()
        throw new Error('validate succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('title')
      }
    })

    it('requires `author`', async () => {
      book.title = 'Harry Potter'
      //book.author = 'Scott Peck'
      book.price = 10.99
      book.inventory = 2

      try {
        await book.validate()
        throw new Error('validate succeeded but should have failed')
      } catch (err) {
        expect(err.message).to.contain('author')
      }
    })
  })
})
