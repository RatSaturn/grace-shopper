const router = require('express').Router()
const {Order} = require('../db/models')
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
  console.log('get cart')
  try {
    if (!req.session.cartId) {
      // no cart on session
      console.log('no cart on session')
      const cart = await Order.create() // create a new cart
      console.log('cart id ', cart.id, 'added to session')
      req.session.cartId = cart.id // add cart.id to session
      res.status(200).json([])
    } else {
      // a cart is on session
      console.log('a cart is on session:', req.session.cartId)
      const cart = await Order.findSingleOrder(req.session.cartId)
      res.status(200).json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/cart/update', async (req, res, next) => {
  console.log('update order')
  console.log(req.session.cartId, req.body)
  try {
    const cart = await Order.updateOrderQuantity(req.session.cartId, req.body)
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }
})
