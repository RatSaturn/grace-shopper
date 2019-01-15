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
  console.log('get cart')
  try {
    if (!req.session.cartId) {
      console.log('no cart on session')
      //no cart on session
      if (req.user) {
        console.log('user is logged in')
        // user is logged in
        const pendingCart = await Order.findOne({where: {userId: req.user.id}})
        console.log('Pending Cart: ', pendingCart)
        if (!pendingCart) {
          // no pending cart
          const cart = await Order.create() // create a new cart
          req.session.cartId = cart.id // add cart.id to session
          const user = await User.findById(req.user.id) // find user
          await cart.setUser(user) //add userId to order
          res.status(200).json([])
        } else {
          // has a pending cart
          req.session.cartId = pendingCart.id // add pendingCart.id to session
          const cart = await Order.findSingleOrder(pendingCart.id) //load the cart info
          res.status(200).json(cart)
        }
      } else {
        // no cart && user is not logged in
        console.log('user is not logged in')
        const cart = await Order.create() // create a new cart
        console.log('cart id ', cart.id, 'added to session')
        req.session.cartId = cart.id // add cart.id to session
        res.status(200).json([])
      }
    } else {
      // this is a cart on session
      console.log('a cart is on session:', req.session.cartId)
      if (req.user) {
        // user is logged in
        const pendingCart = await Order.findOne({where: {userId: req.user.id}})
        if (pendingCart && pendingCart.id !== req.session.cartId) {
          //remove the cart with req.session.cartId
          await Order.destroy({where: {id: req.session.cartId}})
        } else
          await Order.update(
            {userId: req.user.id},
            {where: {id: req.session.cartId}}
          )
      }

      const cart = await Order.findSingleOrder(req.session.cartId)
      res.status(200).json(cart)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/cart/update', async (req, res, next) => {
  console.log('update order')
  console.log(req.body)
  try {
    if (req.session.cartId) {
      //a cart on session
      console.log('a cart on session')
      if (req.user) {
        // user is logged in
        const pendingCart = await Order.findOne({where: {userId: req.user.id}})
        console.log('Pending Cart: ', pendingCart)
        if (!pendingCart) {
          // no pending cart
          const cart = await Order.create() // create a new cart
          req.session.cartId = cart.id // add cart.id to session
          const user = await User.findById(req.user.id) // find user
          await cart.setUser(user) //add userId to order
        } else {
          // has a pending cart
          req.session.cartId = pendingCart.id // add pendingCart.id to session
        }
      } else {
        // no cart && user is not logged in
        const cart = await Order.create() // create a new cart
        console.log(cart)
        req.session.cartId = cart.id // add cart.id to session
      }
    }
    console.log(req.session.cartId, req.body)
    const cart = await Order.updateOrderQuantity(req.session.cartId, req.body)
    res.status(200).json(cart)
  } catch (err) {
    next(err)
  }

  //testing only
  //req.session.cartId = 2
  // try {
  //   // if cart doesn't exist, create one
  //   // if user is logged in, add userId to order
  //   if (!req.session.cartId) {
  //     const cart = await Order.create()
  //     req.session.cartId = cart.id
  //     if (req.user) {
  //       const user = await User.findById(req.user.id)
  //       await cart.setUser(user)
  //     }
  //   }
  //   console.log(req.session.cartId, req.body)
  //   const cart = await Order.updateOrderQuantity(req.session.cartId, req.body)
  //   res.status(200).json(cart)
  // } catch (err) {
  //   next(err)
  // }
})
