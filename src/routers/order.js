const router = require("express").Router()
const User = require("../models/User")
const {
    ensureAdmin,
    ensureAuthenticated
} = require("../middleware/auth")
const Product = require("../models/Products")
const multer = require("multer");
const Order = require("../models/Order")
const stripeSecret = process.env.STRIPE_PRIVATE_SECRET
const stripePublic = process.env.STRIPE_PUBLIC_SECRET
const stripe = require('stripe')(stripeSecret);
const {orderConf} = require("../emails/account")
router.get("/test", async (req, res) => {

    const firstFew = await Product.find({}).limit(4)
    const brands = await Product.find({}).limit(3)
    const ourPicks = await Product.find({}).limit(4)
    res.render("test.ejs", {
        first: firstFew,
        second: brands,
        third: ourPicks
    })
})

router.post("/shipping", ensureAuthenticated, async (req, res) => {
    
const id = req.session.passport.user
    // console.log(req.body)

    const user = await User.findById({_id: id})
    
    var cart = user.cart
    var fullCart = []
    var items = []
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })
        items.push(product)
        fullCart.push(product.price)
    }
    var sum = fullCart.reduce(function(a, b){
        return a + b;
    }, 0);

    const destination = {
        house: req.body.house,
        town: req.body.town,
        city: req.body.city,
        postcode: req.body.postcode
    }
    
    const order = new Order({
        user: id,
        orderItems: items,
        shipping: destination,
        total: sum,
        isPaid: false
    })
    console.log(order._id)

    await order.save()
    user.pastOrders.push(order._id)
    await user.save()
    
    res.render("payment.ejs", {
        items: items,
        total: sum,
        destination: destination,
        stripePublic: stripePublic,
        isAuth: true,
        isAdmin: user.isAdmin
    })
})

router.get("/check", (req, res) => {
    res.render("test.ejs")
})


  router.post("/create-payment-intent", ensureAuthenticated, async (req, res) => {

    const id = req.session.passport.user

    var items = []
    const user = await User.findById({_id: id})
    
    var cart = user.cart

    var fullCart = []

    


    
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })
        items.push(product)
        fullCart.push(product.price)
    }
    var sum = fullCart.reduce(function(a, b){
        return a + b;
    }, 0);

    // console.log(cart)


    // items.forEach(async (product) => {
    //     user.pastOrders.push(product._id)
    // })
    

    await user.save()
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sum * 100,
      currency: 'gbp',
      payment_method_types: ['card'],
      confirm: true,
    });



    // const chargeIntent = await stripe.paymentIntents.capture(
    //     paymentIntent.id
    // )

    console.log(paymentIntent)
    
    res.send({
        clientSecret: paymentIntent.client_secret
    });

    
  });

  router.get("/te", ensureAuthenticated, async (req, res) => {
    const id = req.session.passport.user

    var items = []
    const user = await User.findById({_id: id})
    
    var cart = user.cart

    User.updateOne({_id: id}, {$pullAll: {cart}}, (err, res) => {
        console.log(err)
    })

    const orderID = user.pastOrders.slice(-1)[0]

    console.log(orderID)
    var items = []
    Order.findByIdAndUpdate({_id: orderID}, {isPaid: true}, (err, res) => {
        

        orderConf(user.email, user.name, res.orderItems)
    })


    res.render("thankyou.ejs")
  })

router.get("/checkout", ensureAuthenticated, async (req, res) => {

    const id = req.session.passport.user

    var fullCart = []
    var items = []
    const user = await User.findById({_id: id})
    
    var cart = user.cart

    var fullCart = []
    
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })
        items.push(product)
        fullCart.push(product.price)
    }
    var sum = fullCart.reduce(function(a, b){
        return a + b;
    }, 0);

    console.log(sum)

    // const newOrder = new Order({
    //     shipping: destination
    // })

    res.render("checkout.ejs" , {
        total: sum,
        items: items,
        price: sum,
        isAuth: true,
        isAdmin: user.isAdmin
    })
})

router.get("/shipping", (req, res) => {
    res.render("checkout.ejs")
})

router.post("/payment", ensureAuthenticated, async (req, res) => {

    const destination = {
        house: req.body.house,
        town: req.body.town,
        city: req.body.city,
        postcode: req.body.postcode
    }
const id = req.session.passport.user
    console.log(req.body)

    const user = await User.findById({_id: id})
    
    var cart = user.cart
    var fullCart = []
    var items = []
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })
        items.push(product)
        fullCart.push(product.price)
    }
    var sum = fullCart.reduce(function(a, b){
        return a + b;
    }, 0);

    res.render("payment.ejs", {
        items: items,
        total: sum,
        dest: destination,
        stripePublic: stripePublic,
        isAuth: true,
        isAdmin: user.isAdmin
    })
    
    
})

router.get("/refunds", ensureAuthenticated ,async (req, res) => {

    const orders = await Order.find({}).sort([['createdAt', -1]]);

    // console.log(orders)

    res.render("orders.ejs", {
        names: orders,
        isAuth: true,
        isAdmin: true
    })
})

router.get("/refund", ensureAuthenticated, async (req, res) => {
    const id = req.query.id

    const item = await Order.findOne({_id: id})

    const refund = await stripe.refunds.create({
      charge: 'ch_1Ha458CsCFdBaBTjiBrTAdon',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

    
} )

module.exports = router