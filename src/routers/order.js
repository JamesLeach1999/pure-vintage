const router = require('express').Router();
const User = require('../models/User');
const { ensureAdmin, ensureAuthenticated } = require('../middleware/auth');
const Product = require('../models/products');
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
const Stripe = require('stripe');
const { route } = require('./product');

const stripe = new Stripe(process.env.SECRET_KEY);

router.post('/shipping', ensureAuthenticated, async (req, res) => {
  const id = req.session.passport.user;
  // console.log(req.body)

  const user = await User.findById({ _id: id });

  var cart = user.cart;
  var fullCart = [];
  var items = [];
  for (var i = 0; i < cart.length; i++) {
    var product = await Product.findById({
      _id: cart[i],
    });
    items.push({ product });
    fullCart.push(product.price);
  }
  var sum = fullCart.reduce(function (a, b) {
    return a + b;
  }, 0);

  const destination = {
    address: req.body.town,
    city: req.body.city,
    postcode: req.body.postcode,
  };
  // console.log(items);
  const order = new Order({
    user: id,
    orderItems: JSON.stringify(items),
    shipping: destination,
    total: sum,
    isPaid: false,
  });
  // console.log(order._id);

  await order.save();
  user.pastOrders.push(order._id);
  await user.save();

  res.send({
    items: items,
    total: sum,
    destination: destination,
    stripePublic: stripePublic,
    isAuth: true,
    isAdmin: user.isAdmin,
  });
});

router.get('/check', (req, res) => {
  res.render('test.ejs');
});

router.post('/payment_intents', ensureAuthenticated, async (req, res) => {
  if (req.method === 'POST') {
    try {
      const id = req.session.passport.user;
      // console.log(req.body)
      const user = await User.findById({ _id: id });
      console.log("thtas number")

      var cart = user.cart;
      var fullCart = [];
      var items = [];
      for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
          _id: cart[i],
        });
        if(product !== null){

          items.push({ product });
          fullCart.push(product.price);
        }
      }
      var sum = fullCart.reduce(function (a, b) {
        return a + b;
      }, 0);

      const destination = {
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
      };
      console.log(items);
      const order = new Order({
        user: id,
        orderItems: JSON.stringify(items),
        shipping: destination,
        total: sum,
        isPaid: false,
        intent: ""
      });
      // console.log(order._id);

      await order.save();
      user.pastOrders.push(order._id);
      await user.save();
      const { amount } = req.body;
      console.log(amount);
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
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

router.post("/testing", async (req, res) => {
  console.log(req.body)
})

router.post('/te', ensureAuthenticated, async (req, res) => {
  const id = req.session.passport.user;

  var items = [];
  const user = await User.findById({ _id: id });
  console.log("thats wangnumbe")
console.log(req.body)
  var cart = user.cart;

  User.updateOne({ _id: id }, { $pullAll: { cart } }, (err, res) => {
    console.log(err);
  });

  const orderID = user.pastOrders.slice(-1)[0];
  // console.log(orderID);
  var items = [];
  console.log(user.name)
  Order.findByIdAndUpdate({ _id: orderID }, { isPaid: true, intent:req.body.test.paymentIntent.id }, (err, res) => {
    orderConf(user.email, user.name, res.orderItems);
  });
  console.log("work plz")

  res.send('it fucking worked');
});


router.get('/allOrders', ensureAuthenticated, async (req, res) => {
  const orders = await Order.find({}).sort([['createdAt', -1]]);

  // console.log(orders)

  res.send( {
    names: orders,
    isAuth: true,
    isAdmin: true,
  });
});

router.post("/refund", ensureAuthenticated, async (req, res) => {
  
  Order.findByIdAndRemove({_id: req.body.id}, (err, res) => {
    console.log(res)
    console.log("nailed it")
  })
  const refund = await stripe.refunds.create({
    payment_intent: req.body.intent,
  });

  res.send(refund)
})

router.post('/refundSingle', ensureAuthenticated, async (req, res) => {

  const amount = req.body.amount
  console.log(amount)
  const productId = req.body.productId
  const order = await Order.findById({_id: req.body.id})

  const orderItems = JSON.parse(order.orderItems)

  // console.log(orderItems)

  orderItems.forEach((item) => {
    console.log(item)
  })

    // console.log(orderItems);


  const refund = await stripe.refunds.create({
    payment_intent: req.body.intent,
    amount: amount * 100
  });

  res.send(refund);
});


router.get('/pastOrders', ensureAuthenticated, async (req, res) => {
  console.log('thats numberwang');
  console.log(req.session.passport.user)

  const user = await User.findById({ _id: req.session.passport.user });
  // retrieving only the first 5 results
  const pastOrders = user.pastOrders;
  var orders = [];
  var orderInfo = [];
  for (var i = 0; i < pastOrders.length; i++) {
    if (pastOrders[i] !== null) {
      var product = await Order.findById({
        _id: pastOrders[i],
      });

      orders.push(product);
    }
  }

  // console.log(orders);

  res.send({
    pageTitle: 'welcome',
    user: user,
    names: orders,
    orderInfo: orderInfo,
    //   categories: categories,
    isAuth: true,
    isAdmin: user.isAdmin,
  });
});

router.get("/orderProducts", ensureAuthenticated, async (req, res) => {
  console.log(req.query.id);
  // console.log(req.session.passport.user);

  const user = await User.findById({ _id: req.session.passport.user });
  // retrieving only the first 5 results
  const pastOrders = user.pastOrders;
  // console.log(pastOrders)
  var orders = [];
  var orderInfo = [];
  const product = await Order.findById({_id: req.query.id})

  // console.log(orders);

  res.send({
    pageTitle: 'welcome',
    user: user,
    names: product,
    orderInfo: orderInfo,
    //   categories: categories,
    isAuth: true,
    isAdmin: user.isAdmin,
  });
})

module.exports = router;
