const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAllOrders()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  //testing only
  //req.session.cartId = 2
  try {
    // if cart doesn't exist, create one
    // if user is logged in, add userId to order
    // Todo: when user first logged in:
    // add pending orderId (created from previous login) to session assuming no cart is created yet
    if (!req.session.cartId) {
      const cart = await Order.create()
      req.session.cartId = cart.id
      if (req.user) {
        const user = await User.findById(req.user)
        await cart.setUser(user)
      }
      res.status(200).json([])
    } else {
      const cart = await Order.findSingleOrder(req.session.cartId)
      res.status(200).json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/cart/update', async (req, res, next) => {
  //testing only
  //req.session.cartId = 2
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
    console.log(req.session.cartId, req.body)
    const cart = await Order.updateOrderQuantity(req.session.cartId, req.body)
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})
