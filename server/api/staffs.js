const router = require('express').Router()
const {Staff, Book} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const staff = await Staff.findAll({include: [Book]})
    res.json(staff)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleStaff = await Staff.findById(req.params.id)
    res.json(singleStaff)
  } catch (err) {
    next(err)
  }
})
