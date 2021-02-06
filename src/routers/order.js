const router = require('express').Router();
const User = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const { ensureAdmin, ensureAuthenticated } = require('../middleware/auth');
const Product = require('../models/products');
const multer = require('multer');
const Order = require('../models/Order');
const stripeSecret = process.env.SECRET_KEY;
const stripePublic = process.env.STRIPE_PUBLIC_SECRET;
const { orderConf, orderConfAdmin } = require('../emails/account');
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

router.post('/payment_intents', async (req, res) => {
  if (req.method === 'POST') {
    var { amount } = req.body;

    const id = req.body.id;

    // console.log(req.body);
    try {
      if (!ObjectId.isValid(id)) {
        console.log(ObjectId.isValid(id));
        throw new Error('fnjorwfw');
      }
      var user = await User.findById({ _id: id });

      console.log('thtas number');

      var cart = user.cart;
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
      console.log('items 116');
      console.log(items);
      const order = new Order({
        user: id,
        orderItems: items,
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

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
      });

      res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
      // console.log(error);
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
      console.log(items);
      var ids = [];
      for (var q = 0; items.length > q; q++) {
        console.log(items[q]);
        ids.push(items[q].product._id);
      }
      console.log('ids line 168');
      console.log(ids);
      const order = new Order({
        user: req.body.id,
        orderItems: ids,
        shipping: destination,
        total: sum,
        isPaid: false,
        intent: '',
      });
      console.log(order);
      amount = amount + 95;
      // console.log(order._id);

      await order.save();
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'gbp',
      });

      res.status(200).send(paymentIntent.client_secret);
    }

    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.

    // } catch (err) {
    //   res.status(500).json({ statusCode: 500, message: err.message });
    // }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});

router.post('/testing', async (req, res) => {
  console.log(req.body);
});

router.post('/te', async (req, res) => {
  const id = req.body.id;
  // console.log(req.body);
  var items = [];
  try {
    var user = await User.findById({ _id: id });
    // console.log(id);
    if (!ObjectId.isValid(id)) {
      throw new Error('fnjorwfw');
    }
    // var user
    console.log('thats wangnumbe');
    // console.log(req.body);
    var cart = user.cart;

    User.updateOne({ _id: user._id }, { $pullAll: { cart } }, (err, res) => {
      if (err) throw new Error(err);
      // console.log(res);
    });

    const orderID = user.pastOrders.slice(-1)[0];
    // console.log(orderID);
    var items = [];
    // console.log(user.name);
    Order.findByIdAndUpdate(
      { _id: orderID },
      { isPaid: true, intent: req.body.test.paymentIntent.id },
      (err, res) => {
        console.log('thats nunmberwag 220');
        console.log(res)
        // var resJson = res.orderItems;
        // console.log(res);
        // console.log('11');
        // console.log(resJson);
        // console.log('12');

        // console.log(resJson[0]);
        // console.log('13');

        // console.log(resJson.product);
        // console.log('14');

        // console.log(resJson[0].product);
        // console.log('15');
        orderConf(user.email, user.name, res.orderItems);
        orderConfAdmin(res.orderItems, res.shipping);
      }
    );
    const test = await Order.findOne({ _id: orderID }).populate('orderItems');
    console.log('test populate');
    console.log(test);

    console.log(test[0]);
    res.send('it  worked');
  } catch (error) {
    const oID = await Order.find({});
    const orderID = oID.slice(-1)[0];
    Order.findByIdAndUpdate(
      { _id: orderID._id },
      { isPaid: true, intent: req.body.test.paymentIntent.id },
      (err, res) => {
        console.log('thats nunmberwag 241');
        console.log(res)
        // var resJson = res.orderItems;
        // console.log('11');
        // console.log(resJson);
        // console.log('12');

        // console.log(resJson[0]);
        // console.log('13');

        // console.log(resJson.product);
        // console.log('14');

        // console.log(resJson[0].product);
        // console.log('15');

        // resJson.forEach((item) => {
        //   console.log('thats nunmberwag 245');
        //   console.log(item.product);
        //   Product.findByIdAndUpdate({ _id: item.product._id }, {inStock: false}, (err, res) => {
        //     if (err) throw err;
        //     console.log(res);
        //   });
        // });
        orderConf(id, 'user', res.orderItems);
        orderConfAdmin(res.orderItems, res.shipping);
      }
    );
    const test = await Order.findOne({ _id: orderID }).populate('orderItems');
    console.log('test populate');
    console.log(test);
    res.send('it  worked');
  }

  console.log('work plz');
});

router.get('/allOrder', async (req, res) => {
  const orders = await Order.find({}).sort([['createdAt', -1]]);
console.log("allorders pop")
const t = await Order.find({}).populate("orderItems")
console.log("test all populate")
console.log(t)
  Order.find({})
    .populate('orderItems')
    .exec(function (err, res) {
      if (err) return err;
      console.log('orderpopulate');
      console.log(res);
    });


  console.log(orders);

  res.send({
    names: orders,
    isAuth: true,
    isAdmin: true,
  });
});

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

router.post('/refundSingle', ensureAuthenticated, async (req, res) => {
  var amount = req.body.amount;
  console.log(amount);
  const productId = req.body.productId;
  const order = await Order.findById({ _id: req.body.id });

  const orderItems = JSON.parse(order.orderItems);

  // console.log(orderItems)

  orderItems.forEach((item) => {
    console.log(item);
  });

  // console.log(orderItems);
  var refundPrice;
  if (req.body.percent) {
    var percent = req.body.percent / 100;

    var refundPr = amount * percent;
    refundPrice = Math.round(refundPr);
  } else {
    refundPrice = amount;
  }

  var refundAmount = refundPrice * 100 + 95;
  const refund = await stripe.refunds.create({
    payment_intent: req.body.intent,
    amount: refundAmount,
  });
  console.log(refund);

  res.redirect('/allOrders');
});

router.get('/pastOrders', async (req, res) => {
  console.log('thats numberwang');
  // console.log(req.query.id);

  const user = await User.findById({ _id: req.query.id });
  // retrieving only the first 5 results
  const pastOrders = user.pastOrders;
  var orders = [];
  var orderInfo = [];
  for (var i = 0; i < pastOrders.length; i++) {
    if (pastOrders[i] !== null) {
      var product = await Order.findById({
        _id: pastOrders[i],
      }).sort([['createdAt', -1]]);
      Order.findById({ _id: pastOrders[i] })
        .populate('orderItems')
        .exec(function (err, res) {
          console.log(res);
        });
      if (product !== null || product !== undefined) {
        orders.push(product);
      }
      // console.log(product)
    }
  }
  var filtered = orders.filter(function (el) {
    return el != null;
  });

  // console.log(JSON.stringify(user));

  console.log('1st filtered');
  console.log(filtered);

  // Order.find

  var item = [];

  filtered.forEach((items) => {
    // console.log(JSON.parse(items.orderItems));
    // console.log(JSON.parse(items.orderItems[0]));
    console.log(items);
    // item.push(JSON.parse(items.orderItems[0]));
  });

  console.log('1st items');
  console.log(item);

  var i = [];
  item.forEach((r) => {});

  var allOrders = [];

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
  data.map((items) => {
    it.push(items.orderItems);
    console.log('numberwang 405');
    it.map((price) => {
      // console.log(price);
      var t = [];
      price.map((r) => {
        t.push(r.product.price);
        // console.log(t);
      });
      sum1 = t.reduce(function (a, b) {
        return a + b;
      }, 0);
      // console.log(sum1);
    });
    sumPrice.push(sum1);
  });

  // console.log(sumPrice);
  // console.log('working');
  // console.log(item);
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
  // console.log(req.query.id);
  // console.log(req.query.user);

  const user = await User.findById({ _id: req.query.user });
  // console.log(req.session.passport.user);
  const product = await Order.findById({ _id: req.query.id });
  console.log('thats nuberwang line 449');
  console.log(product);
  const p = JSON.parse(product.orderItems);

  console.log(p);
  console.log('thats nuberwang line 454');
  var it = [];

  console.log('thats nuberwang line 457');

  res.send({
    pageTitle: 'welcome',
    user: user,
    names: product,
    orderInfo: p,
    //   categories: categories,
    isAuth: true,
  });
});

router.get('/orderProducts/*', (req, res) => {
  res.redirect('/store');
});

module.exports = router;
