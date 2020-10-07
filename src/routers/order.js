const router = require("express").Router()
const User = require("../models/User")
const {
    ensureAdmin,
    ensureAuthenticated
} = require("../middleware/auth")
const Product = require("../models/Products")
const multer = require("multer");
const Order = require("../models/Order")

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
        dest: destination
    })
})

router.get("/checkout", ensureAuthenticated, async (req, res) => {

    const id = req.session.passport.user

    var fullCart = []
    var items = []
    const user = await User.findById({_id: id})
    
    var cart = user.cart

    
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
        price: sum,
        items: items
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
    const items = []
    
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })
        items.push(product)
    }

    const order = new Order({
        user: id,
        orderItems: items,
        shipping: destination,
        payment: {paymentMethod: req.body.sort},
        total: req.body.total,

    })

    await order.save()

    res.send(order)
    
    

    
})

module.exports = router