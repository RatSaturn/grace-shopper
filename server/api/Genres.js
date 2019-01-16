const router = require('express').Router()
const {Genre} = require('../db/models/Index')
const {Book} = require('../db/models/Index')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll()
    res.json(genres)
  } catch (err) {
    next(err)
  }
})

router.get('/:genre', async (req, res, next) => {
  try {
    const booksByGenre = await Book.findAll({
      where: {genre: req.params.genre}
    })
    res.json(booksByGenre)
  } catch (err) {
    next(err)
  }
})
