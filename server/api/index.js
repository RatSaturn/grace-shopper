const router = require('express').Router()
module.exports = router

router.use('/users', require('./Users'))
router.use('/books', require('./Books'))
router.use('/authors', require('./Authors'))
router.use('/genres', require('./Genres'))
router.use('/staffs', require('./Staffs'))
router.use('/orders', require('./Orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
