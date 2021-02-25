const router = require('express').Router();
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const { ensureAdmin, ensureAuthenticated } = require('../middleware/auth');
const Product = require('../models/products');
const Order = require('../models/Order');
// 
const { orderConf, orderConfAdmin } = require('../emails/account');
const Stripe = require('stripe');

// using the stripe key env variable from heroku
const stripeSecret = process.env.SECRET_KEY;
const stripePublic = process.env.STRIPE_PUBLIC_SECRET;

const stripe = new Stripe(process.env.SECRET_KEY);


router.post('/payment_intents', async (req, res) => {
  console.log(req.body);

  // getting user id from a hidden fieeld in the post form

  if (req.method === 'POST') {
    var { amount, address, city, postcode } = req.body;

    const id = req.body.id;

    // console.log(req.body);
    try {
      if (!ObjectId.isValid(id)) {
        console.log(ObjectId.isValid(id));
        throw new Error('fnjorwfw');
      }
      var user = await User.findById({ _id: id });

      console.log('thtas number');

      // getting user cart, for each item (object id) in the cart, query the products table
      // and push product to items array, push price to fullCart array
      var cart = user.cart;
      var fullCart = [];
      var items = [];
      for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
          _id: cart[i],
        });
        if (product !== null) {
          // im not sure if destructuring is needed here
          items.push({ product });
          fullCart.push(product.price);
        }
      }
      // summing up all the prices
      var sum = fullCart.reduce(function (a, b) {
        return a + b;
      }, 0);

      // using destructured values from req.body
      const destination = {
        address: address,
        city: city,
        postcode: postcode,
      };
      
      // create order, push order id to past orders for the user, and save everything
      const order = new Order({
        user: id,
        orderItems: JSON.stringify(items),
        shipping: destination,
        total: sum,
        isPaid: false,
        intent: '',
      });
      // console.log(order._id);

      await order.save();
      user.pastOrders.push(order._id);
      await user.save();
      amount = amount + 95;

      // we send back the client ID to confirm the card payment with stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
     
      // same again but with non logged in users

      console.log('thtas number 2');
      var cart = req.body.cart;
      var fullCart = [];
      var items = [];
      for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
          _id: cart[i],
        });
        if (product !== null) {
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
      // console.log(items);
      var ids = [];
      for (var q = 0; items.length > q; q++) {
        // console.log(items[q]);
        ids.push(items[q].product);
      }
      console.log('ids line 168');
      // console.log(items);
      // items.forEach((i) => {
      //   console.log(i.product)
      //   ids.push(i.product)
      // })
      const order = new Order({
        user: req.body.id,
        orderItems: JSON.stringify(items),
        shipping: destination,
        total: sum,
        isPaid: false,
        intent: '',
      });
      // console.log(order);
      amount = amount + 95;
      // console.log(order._id);

      await order.save();
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
      });

      res.status(200).send(paymentIntent.client_secret);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});


router.post('/confirmOrder', async (req, res) => {
  const id = req.body.id;
  var items = [];
  try {
    var user = await User.findById({ _id: id });
    
    if (!ObjectId.isValid(id)) {
      throw new Error('Not logged in, carrying on');
    }
    
    var cart = user.cart;

    // clearing the users cart, after it was added to past orders in payment_intents

    User.updateOne({ _id: user._id }, { $pullAll: { cart } }, (err, res) => {
      if (err) throw new Error(err);
    });

    const orderID = user.pastOrders.slice(-1)[0];
    console.log(orderID);
    var items = [];
    // console.log(user.name);
    // payment confirmed with stripe, add this to the order.
    // we only store payment intents as its all we need to modify the payment
    // and it cant be used for anything without the env variable
    Order.findByIdAndUpdate(
      { _id: orderID },
      { isPaid: true, intent: req.body.test.paymentIntent.id },
      (err, res) => {
        console.log('thats nunmberwag 220');
        // console.log(res);
        // confirming order with user and admin, not currently working
        // orderConf(user.email, user.name, res.orderItems);
        // orderConfAdmin(res.orderItems, res.shipping);
      }
    );
    const test = await Order.findOne({ _id: orderID }).populate('orderItems');
    console.log('test populate');
    // console.log(test);

    // console.log(test[0]);
    res.send('it  worked');
  } catch (error) {
    const oID = await Order.find({});
    const orderID = oID.slice(-1)[0];
    console.log(orderID)
    Order.findByIdAndUpdate(
      { _id: orderID._id },
      { isPaid: true, intent: req.body.test.paymentIntent.id },
      (err, res) => {
        console.log('thats nunmberwag 241');
        // console.log(res);
        
        // orderConf(id, 'user', res.orderItems);
        // orderConfAdmin(res.orderItems, res.shipping);
      }
    );
    const test = await Order.findOne({ _id: orderID }).populate('orderItems');
    console.log('test populate');
    // console.log(test);
    res.send('it  worked');
  }

  console.log('work plz');
});

// get all previous orders for admin in reverse order
router.get('/allOrder', async (req, res) => {
  const orders = await Order.find({}).sort([['createdAt', -1]]);

  res.send({
    names: orders,
    isAuth: true,
    isAdmin: true,
  });
});

// this is for a full refund, when this happens just remove the order
router.post('/refund', ensureAuthenticated, async (req, res) => {
  Order.findByIdAndRemove({ _id: req.body.id }, (err, res) => {
    console.log(res);
    console.log('nailed it');
  });
  const refund = await stripe.refunds.create({
    payment_intent: req.body.intent,
  });

  res.redirect('/allOrders');
});

// even though this middleware causes annoying pproblems, for something as important as refunds i think its fair enough
router.post('/refundSingle', ensureAuthenticated, async (req, res) => {

  // get all values from req.body
  var { amount, productId, id, percentReq, intent} = req.body;
  console.log(amount);

  // dont modify the order, store the refund percent on stripess end
  const order = await Order.findById({ _id: id });

  const orderItems = JSON.parse(order.orderItems);

  // console.log(orderItems)

  orderItems.forEach((item) => {
    console.log(item);
  });

  // quick bit of maths to only refund a certain percent if needed
  var refundPrice;
  if (percentReq) {
    var percent = percentReq / 100;

    var refundPr = amount * percent;
    refundPrice = Math.round(refundPr);
  } else {
    refundPrice = amount;
  }

  var refundAmount = refundPrice * 100 + 95;
  const refund = await stripe.refunds.create({
    payment_intent: intent,
    amount: refundAmount,
  });
  console.log(refund);

  res.redirect('/allOrders');
});

router.get('/pastOrders', async (req, res) => {

  // this is currently a complete mess 
  // TODO sort this out
  console.log('thats numberwang');

  const user = await User.findById({ _id: req.query.id });
  const pastOrders = user.pastOrders;
  var orders = [];
  var orderInfo = [];
  for (var i = 0; i < pastOrders.length; i++) {
    // get past orders by id by most recent
    if (pastOrders[i] !== null) {
      var product = await Order.findById({
        _id: pastOrders[i],
      }).sort([['createdAt', -1]]);
      if (product !== null || product !== undefined) {
        orders.push(product);
      }
      console.log(product);
    }
  }

  // on my admin account for some reson theres alot of null orders so fixing any errors from that.
  var filtered = orders.filter(function (el) {
    return el != null;
  });

  // console.log(JSON.stringify(user));

  console.log('1st filtered');
  console.log(filtered);

  // Order.find

  var item = [];


  var i = [];
  // item.forEach((r) => {});

  var allOrders = [];

  // doing it again becausw sometimes it dosent work the first time for some reason

  filtered.map((order) => {
    // console.log(order);
    if (order !== null) {
      allOrders.push(order);
    }
  });
  var t = [];

  var revor = item.reverse();
  var data;
  if (revor) {
    data = allOrders.reverse();
  }

  // console.log(allOrders);
  // console.log(data);
  // console.log(total);

  var it = [];
  var sumPrice = [];
  var sum1;
  var idk = [];
  console.log('1st data');
  console.log(data);
  
  // alot of test staements got some weird results from this
  console.log(sumPrice);
  console.log('Numberwang line 436');
  console.log(filtered);
  console.log('Numberwang line 438');
  console.log(item);
  console.log('NUmberwang line 440');
  item.forEach((i) => {
    i.forEach((j) => {
      console.log(j.product.size);
    });
  });

  res.send({
    pageTitle: 'welcome',
    user: user,
    names: filtered,
    orderInfo: item,
    total: sumPrice,
    //   categories: categories,
    isAuth: true,
    isAdmin: user.isAdmin,
  });
});

router.get('/orderProducts', async (req, res) => {
  // getting the productts fro the previous past orders
  var p;
  const user = await User.findById({ _id: req.query.user });
  // console.log(req.session.passport.user);
  const product = await Order.findById({ _id: req.query.id });
  console.log('thats nuberwang line 449');
  console.log(product);
  if (product.orderItems) {
    p = JSON.parse(product.orderItems);
  }

  // console.log(p);
  console.log('thats nuberwang line 454');
  var it = [];

  console.log('thats nuberwang line 457');

  res.send({
    pageTitle: 'welcome',
    user: user,
    names: product,
    orderInfo: p || 'nothing',
    //   categories: categories,
    isAuth: true,
  });
});

router.get('/orderProducts/*', (req, res) => {
  res.redirect('/store');
});

module.exports = router;
