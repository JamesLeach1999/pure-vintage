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

router.get("/check", (req, res) => {
    res.render("test.ejs")
})
router.post('/create-session', ensureAuthenticated, async (req, res) => {
    console.log(req.body)

    const id = req.session.passport.user
    console.log(req.body)

    const user = await User.findById({_id: id})

    const cart = user.cart
    console.log(cart)
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

    console.log(sum)
        
    

    

    console.log(product)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        
        {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: product.name,
                images: [`../../views/assets/${product.image}`],
              },
              unit_amount: sum * 100,
            },
            quantity: 1,
          },
      ],
      mode: 'payment',
      success_url: "http://localhost:3000/store.ejs",
      cancel_url: "http://localhost:3000/login.ejs",
    });
    res.json({ id: session.id });
  });

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

    console.log(cart)

    await User.updateOne({_id: id}, {$pullAll: {cart}})

    items.forEach(async (product) => {
        user.pastOrders.push(product._id)
    })

    await user.save()
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: sum*100,
      currency: "gbp"
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });

    
  });

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

    res.render("payment.ejs" , {
        total: sum,
        items: items,
        isAuth: true,
        isAdmin: user.isAdmin
    })
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

    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: req.body.total,
    //     currency: 'gbp',
    //     payment_method_types: ['card'],
    //     receipt_email: user.email,
    //   });

    //   console.log(paymentIntent)
    // const destination = {
    //     house: req.body.house,
    //     town: req.body.town,
    //     city: req.body.city,
    //     postcode: req.body.postcode
    // }


    // var cart = user.cart
    // const items = []
    
    // for (var i = 0; i < cart.length; i++) {
    //     var product = await Product.findById({
    //         _id: cart[i]
    //     })
    //     items.push(product)
    // }

    // const order = new Order({
    //     user: id,
    //     orderItems: items,
    //     shipping: destination,
    //     payment: {paymentMethod: req.body.sort},
    //     total: req.body.total,

    // })

    // await order.save()

    // res.send(order)
    
    
})

module.exports = router