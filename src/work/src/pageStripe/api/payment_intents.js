import Stripe from 'stripe';
const router = require('express').Router();
const User = require('../models/User');
const { ensureAdmin, ensureAuthenticated } = require('../middleware/auth');
const Product = require('../models/Products');
const multer = require('multer');
const Order = require('../models/Order');
const stripeSecret = process.env.SECRET_KEY;
const stripePublic = process.env.STRIPE_PUBLIC_SECRET;
const { orderConf } = require('../emails/account');
router.get('/test', async (req, res) => {
  const firstFew = await Product.find({}).limit(4);
  const brands = await Product.find({}).limit(3);
  const ourPicks = await Product.find({}).limit(4);
  res.render('test.ejs', {
    first: firstFew,
    second: brands,
    third: ourPicks,
  });
});
const stripe = new Stripe(process.env.REACT_APP_SECRET_KEY);

router.post("/payment_intents",async(req, res) => {
  console.log(req.body)
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});

export default router