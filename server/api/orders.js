const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.getAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    // if cart doesn't exist, create one
    // if user is logged in, add userId to order
    // todo: when user first logged in, add userId to pending order
    if (!req.session.cartId) {
      const cart = Order.create()
      req.session.cartId = cart.id
      if (req.user) {
        const user = User.findById(req.user)
        cart.setUser(user)
      }
      res.status(200).json([])
    }
  } catch (err) {
    next(err)
  }
})
