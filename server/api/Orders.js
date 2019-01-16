const router = require('express').Router()
const {Order, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const orders = await Order.findAllOrders(req.user.id)
      res.json(orders)
    } else res.json([])
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    if (!req.session.cartId) {
      // no cart on session
      const cart = await Order.create() // create a new cart
      req.session.cartId = cart.id // add cart.id to session
      res.status(200).json([])
    } else {
      // a cart is on session
      const cart = await Order.findSingleOrder(req.session.cartId)
      res.status(200).json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/cart/update', async (req, res, next) => {
  try {
    const cart = await Order.updateOrderQuantity(req.session.cartId, req.body)
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/cart/complete', async (req, res, next) => {
  try {
    const cart = await Order.findById(req.session.cartId)
    await cart.markCompleted()
    const newCart = await Order.create()
    if (req.user) {
      const user = await User.findById(req.user.id)
      await newCart.setUser(user)
    }
    req.session.cartId = newCart.id
    res.status(200).json([])
  } catch (err) {
    next(err)
  }
})
