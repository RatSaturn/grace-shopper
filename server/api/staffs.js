const router = require('express').Router()
const {Staff, Book} = require('../db/models')

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
    const staff = await Staff.findById(req.params.id, {include: [Book]})
    //const staffPicks = await staff.getBooks()
    res.json(staff)
  } catch (err) {
    next(err)
  }
})
