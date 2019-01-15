const router = require('express').Router()
const {Order, User} = require('../db/models')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    console.log('/login: user:', user)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // update session.cartId if user already has a pending order
      // associate userId with cart on session if no pending order
      const pendingOrder = await Order.findOne({where: {userId: user.id}})
      console.log('Pending Order: ', pendingOrder)
      if (pendingOrder && pendingOrder.id != req.session.cartId) {
        await Order.destroy({where: {id: req.session.cartId}})
        req.session.cartId = pendingOrder.id
      } else if (req.session.cartId) {
        // this should always be true when no pendingOrder
        const cart = await Order.findById(req.session.cartId)
        await cart.setUser(user)
      }

      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)

    if (req.session.cartId) {
      // this should always be true at signup
      const cart = await Order.findById(req.session.cartId)
      await cart.setUser(user)
    }

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  // update session.cartId if user already has a pending order
  // associate userId with cart on session if no pending order
  //const user = await User.findOne({where: {email: req.user.email}})
  if (req.user) {
    const pendingOrder = await Order.findOne({where: {userId: req.user.id}})
    console.log('Pending Order: ', pendingOrder)
    if (pendingOrder && pendingOrder.id != req.session.cartId) {
      await Order.destroy({where: {id: req.session.cartId}})
      req.session.cartId = pendingOrder.id
    } else if (req.session.cartId) {
      // this should always be true when no pendingOrder
      const cart = await Order.findById(req.session.cartId)
      const user = await User.findById(req.user.id)
      await cart.setUser(user)
    }
  }
  res.json(req.user)
})

router.use('/google', require('./google'))
