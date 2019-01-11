const router = require('express').Router()
const {Book} = require('../db/models')
//remove when done!!!
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleBook = await Book.findById(req.params.id)
    res.json(singleBook)
  } catch (err) {
    next(err)
  }
})

//test route, remove when done!!!
router.get('/getBooks/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const allBooks = await Order.findOrders(req.params.id)
    res.json(allBooks)
  } catch (err) {
    next(err)
  }
})
