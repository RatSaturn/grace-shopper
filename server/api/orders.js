const router = require('express').Router()
const {Order, Book} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [Book]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
