const router = require("express").Router()
const User = require("../models/User")
const {
    loadPage,
    ensureAuthenticated
} = require("../middleware/auth")
const Product = require("../models/Products")
const multer = require("multer");
const { agent } = require("supertest");

// AUTHENTICATION EXPLAINED
// i have used ensureAuthenticated on most of the routes here. This is so we can get the session and user ID and therefore the user profile
// i also return whether or not the user is authenticated and whether or not they are an admin
// the results of these return vvalues determine what you see in the navigation bar, or the nav partial
// if the user is not authenticated, i didnt want to do a catch all in the auth middleware as all cases are slightly different and the data needed for the pages isnt returned
// instead, i check whether or not theyre logged in and render in the same or different page with different data
// i also check for whether or not the passport value is empty. when you log out it dosent delete the passport field from the session
// but rather just removes the value for passport leaving it blank. so had to account for this as well

// rendering general layouts for all pages
router.get("/", (req, res) => {
    console.log(req.session)
    res.render("layout")
})

// IMAGES, defining the destination
// multer is the most simple and popular library for image uploads in node

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        cb(null, file.originalname);
    }
});

const upload = multer({
    limits: {
        fileSize: 100000000,
        size: 100000000
    },
    storage: storage,

    // the value is a function to run whenever a file is uploaded

    fileFilter(req, file, cb) {
        console.log(file)
        // using regex to check the file type is correct
        if (!file.originalname.match(/\.(jpg| jpeg| png)$/)) {
            return cb(new Error("please upload images of correct file type"))
        }

        cb(undefined, true)
    },

})

// only admins can upload and uses multer middleware to handle images
router.post("/products", ensureAuthenticated, upload.array("image", 10), async (req, res) => {
    
    var errors = []
    // using an array to store theimages max is 10 images
    var ogName = []

    // retreiving input data. using multer middleware for the image

    var fileJPG = req.files

    fileJPG.forEach(img => {
        ogName.push(img.originalname)
    })

    console.log(fileJPG)
    const price = req.body.price
    const name = req.body.name
    const brand = req.body.brand
    const category = req.body.category
    const description = req.body.description
    const size = req.body.size
    const image = fileJPG

    // ERROR CHECKING. makes sure all fields filled
    if (!price || !name || !image || !brand || !category || !description) {
        errors.push({
            msg: "please fill all fields"
        })
    }

    if (price < 0) {
        errors.push({
            msg: "price cant be below 0"
        })
    }

    const user = await User.findOne({
        _id: req.session.passport.user
    })

    // again, only will work if the user is an admin. wont matter too much as if they are not admins they wont see the option to upload anyway

    if (user.isAdmin) {
        const products = new Product({
            price,
            name,
            brand,
            category,
            description,
            size,
            image: ogName
        })


        try {
            await products.save()

            res.redirect("home")
        } catch (error) {
            res.status(401).send(error)
        }
    } else {
        res.send("log in as admin")
    }

})

// getting the manage products page for the create, edit and delete page links
router.get("/manage", ensureAuthenticated, async (req, res) => {
    
    const id = req.session.passport.user

    const user = await User.findById({_id: id})

    if(!user.isAdmin){
        res.redirect("/home")
    } else {
        res.render("manage.ejs", {
            isAdmin: true,
            isAuth: true
        })
    }
})
// getting the add page
router.get('/add', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById({_id: req.session.passport.user})

        res.render("add.ejs",{
            isAuth: true,
            isAdmin: user.isAdmin
        })

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

// getting the edit page, will add pagnintation 
router.get('/edit', ensureAuthenticated, async (req, res) => {
    try {
        // getting the add page
        const user = await User.findById({_id: req.session.passport.user})

        res.render("add.ejs",{
            isAuth: true,
            isAdmin: user.isAdmin
        })

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

// getting the delete agent,again will add pagnintation
router.get('/delete', ensureAuthenticated, async (req, res) => {
    try {
        // getting the add page
        const user = await User.findById({_id: req.session.passport.user})

        res.render("add.ejs",{
            isAuth: true,
            isAdmin: user.isAdmin
        })

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

// again, checking if the user is logged in then sending back different results depending
router.get('/home', async (req, res) => {
    console.log(req.session)

    if(req.session.passport && req.session.passport.user){
        try {
            const user = await User.findById({_id: req.session.passport.user})
            // retrieving only the first 5 results
            const products = await Product.find({}).limit(5)
    
            const categories = await Product.find({}).limit(2)
    
            res.render("index.ejs", {
                pageTitle: "welcome",
                names: products,
                query: req.query.id,
                categories: categories,
                isAuth: true,
                isAdmin: user.isAdmin
            })
    
        } catch (error) {
            res.status(400).send(error + "numberwang")
        }
    } else {
        try {
            // retrieving only the first 5 results
            const products = await Product.find({}).limit(5)
    
            const categories = await Product.find({}).limit(2)
    
            res.render("index.ejs", {
                pageTitle: "welcome",
                names: products,
                query: req.query.id,
                categories: categories,
                isAuth: false,
                isAdmin: false
            })
    
        } catch (error) {
            res.status(400).send(error + "numberwang")
        }
    }
})

// similarly to the home page with the logged in. will add pagnintation
router.get('/store',  async (req, res) => {

    console.log(req.session)
    if(req.session.passport && req.session.passport.user){
        const user = await User.findById({_id: req.session.passport.user})
        const isAdmin = user.isAdmin
        console.log(isAdmin)
    try {
        if (req.query.category) {
            var product = await Product.find({
                category: req.query.category
            })
        }
        else if (req.query.category) {
            var product = await Product.find({
                category: req.query.category
            })
        }
        else if (req.query.category) {
            var product = await Product.find({
                category: req.query.category
            })
        } else {
            var product = await Product.find({})
        }
        res.render("store.ejs", {
            pageTitle: "welcome",
            names: product,
            query: req.query.id,
            isAuth: true,
            isAdmin: isAdmin
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
} else {
    try {
        if (req.query.category) {
            var product = await Product.find({
                category: req.query.category
            })
        } else {
            var product = await Product.find({})
        }
        res.render("store.ejs", {
            pageTitle: "welcome",
            names: product,
            query: req.query.id,
            isAuth: false,
            isAdmin: false
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
}
})

// getting individual products based on their passed in ids from the store page
router.get('/product', async (req, res) => {

    if(req.session.passport && req.session.passport.user){
    try {

        const product = await Product.findOne({
            _id: req.query.id
        })

        const user = await User.findById({_id: req.session.passport.user})
        const isAdmin = user.isAdmin
        
        // also returning all images which will be shown on the individual product page
        res.render("product.ejs", {
            pageTitle: "welcome",
            name: product,
            query: req.query.id,
            inCart: req.query.inCart,
            reviews: product.reviews,
            isAuth: true,
            isAdmin: isAdmin,
            images: product.image
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
} else {
    try {

        const product = await Product.findOne({
            _id: req.query.id
        })
        
        res.render("product.ejs", {
            pageTitle: "welcome",
            name: product,
            query: req.query.id,
            inCart: req.query.inCart,
            reviews: product.reviews,
            isAuth: false,
            isAdmin: false
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
}
})

// posting reviews for products, pushing them onto the product review array
router.post("/reviews", ensureAuthenticated, async (req, res) => {

    const star = req.body.star
    const name = req.body.name
    const brand = req.body.desc
    const id = req.body.id

    const review = {
        name: name,
        rating: star,
        comment: brand
    }

    const product = await Product.findOne({
        _id: id
    })

    product.reviews.push(review)

    await product.save()

    res.render("product.ejs", {
        pageTitle: "welcome",
        name: product,
        reviews: product.reviews,
        isAuth: true,
        isAdmin: false
        // inCart: req.query.inCart
    })

})

// adding products to your cart, fairly straight forward just pushing the selected product onto your cart array
router.get('/added', ensureAuthenticated, async (req, res) => {
    try {
        const newP = await Product.findOne({
            _id: req.query.inCart
        })
        const user = await User.findByIdAndUpdate({
            _id: req.session.passport.user
        }, {
            $push: {
                cart: newP._id
            }
        })
        await user.save()
        const test = await Product.findOne({
            _id: user.cart
        })
        console.log(test)
        // console.log(req.query.cart)

        res.redirect("/home")
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

// getting the cart page. using an array to return all cart items to be displayed with ejs
router.get("/cart", ensureAuthenticated, async (req, res) => {

    var fullCart = []

    const user = await User.findById({
        _id: req.session.passport.user
    })

    const isAdmin = user.isAdmin
    // console.log(user['cart'])
    const cart = user['cart']
    for (var i = 0; i < cart.length; i++) {
        var product = await Product.findById({
            _id: cart[i]
        })

        fullCart.push(product)
    }
    // console.log(fullCart)
    res.render('cart.ejs', {
        cart: fullCart,
        isAuth: true,
        isAdmin: isAdmin
    })

})

// removing products from your cart. can currently only do 1 at a time with the cart.remove
router.post("/cartProduct", ensureAuthenticated, async (req, res) => {
    try {
        // const ID = req.params.id

        const newP = await Product.findOne({
            _id: req.body.id
        })
        const user = await User.findById({
            _id: req.session.passport.user
        
        })

        const cart = user.cart
        
        cart.remove({_id: req.body.id})

        console.log(cart)

        
        await user.save()

        // const products = await User.findByIdAndDelete({cart: req.body.id})

        // console.log(user)
        res.redirect('/store')
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/product/:id', ensureAuthenticated, async (req, res) => {

    const validUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => {
        return validUpdates.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(404).send({
            error: "invalid update "
        })
    }
    try {
        const ID = req.params.id
        const products = await Product.findOne({
            _id: ID,
            owner: req.user._id
        })

        if (!products) {
            return res.status(404).send()
        }

        updates.forEach((update) => products[update] = req.body[update])
        await products.save()
        res.send(products)

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router