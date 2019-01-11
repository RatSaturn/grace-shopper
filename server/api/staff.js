const router = require('express').Router()
const {Staff} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const staff = await Staff.findAll()
    res.json(staff)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleBook = await Staff.findById(req.params.id)
    res.json(singleBook)
  } catch (err) {
    next(err)
  }
})
