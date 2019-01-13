const router = require('express').Router()
const stripe = require('stripe')('pk_test_PqdBTVeeLsNk0o9T45hOEe6')

module.exports = router

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
