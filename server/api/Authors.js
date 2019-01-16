const router = require('express').Router()
const {Author} = require('../db/models')
const {Book} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.findAll()
    res.json(authors)
  } catch (err) {
    next(err)
  }
})

router.get('/:author', async (req, res, next) => {
  try {
    const author = req.params.author.split('-').join(' ')
    const singleBookByAuthor = await Book.findAll({
      where: {authors: {$contains: [author]}}
    })
    res.json(singleBookByAuthor)
  } catch (err) {
    next(err)
  }
})
