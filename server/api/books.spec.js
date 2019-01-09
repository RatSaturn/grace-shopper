const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Book = db.model('book')

describe('Book routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/books', () => {
    const fakeBook = {
      title: 'Harry Potter',
      authors: ['JK Rowling'],
      imageUrl:
        'https://prodimage.images-bn.com/pimages/9780545791328_p0_v3_s550x406.jpg',
      price: 1895,
      genre: 'Fantacy Fiction',
      inventory: 2
    }
    beforeEach(() => {
      return Book.create(fakeBook)
    })

    it('GET /api/books', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(fakeBook.title)
    })
  })
})
