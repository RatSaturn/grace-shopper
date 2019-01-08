const router = require('express').Router()
const {Book} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (err) {
    next(err)
  }
})
