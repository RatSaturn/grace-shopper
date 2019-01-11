const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.getAllOrders()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    // if cart doesn't exist, create one
    // if user is logged in, add userId to order
    // Todo: when user first logged in:
    // 1. add userId to pending order
    // 2. add pending orderId to session if no cart is created yet
    if (!req.session.cartId) {
      const cart = await Order.create()
      req.session.cartId = cart.id
      if (req.user) {
        const user = await User.findById(req.user)
        await cart.setUser(user)
      }
      res.status(200).json([])
    } else {
      const cart = await Order.findOrder(req.session.cartId)
      console.log(cart)
      res.status(200).json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/cart/update', async (req, res, next) => {
  try {
    // if cart doesn't exist, create one
    // if user is logged in, add userId to order
    if (!req.session.cartId) {
      const cart = await Order.create()
      req.session.cartId = cart.id
      if (req.user) {
        const user = await User.findById(req.user)
        await cart.setUser(user)
      }
    }
    const cart = await Order.Update(req.session.cartId, req.body)
    console.log(cart)
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})
