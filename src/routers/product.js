const router = require("express").Router()
const User = require("../models/User")
const {
    ensureAdmin,
    ensureAuthenticated
} = require("../middleware/auth")
const Product = require("../models/Products")
const multer = require("multer");


router.get("/", (req, res) => {
    console.log(req.session)
    res.render("layout")
})

// IMAGES, defining the destination


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
        fileSize: 1000000
    },
    storage: storage,

    // the value is a function to run whenever a file is uploaded



    fileFilter(req, file, cb) {
        console.log(file)
        if (!file.originalname.match(/\.(jpg| jpeg| png)$/)) {
            return cb(new Error("please upload images"))
        }

        cb(undefined, true)
    },

})
// only admins can upload and uses multer middleware to handle images
router.post("/products", ensureAdmin, upload.single("image"), async (req, res) => {
    // const user = await User.find({_id: req.user._id})
    var errors = []

    // retreiving input data. using multer middleware for the image

    fileJPG = req.file.originalname
    const price = req.body.price
    const name = req.body.name
    const brand = req.body.brand
    const category = req.body.category
    const description = req.body.description
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

    if (req.session.isAdmin) {
        const products = new Product({
            price,
            name,
            brand,
            category,
            description,
            image
        })

        console.log(req.session)

        try {
            await products.save()
            const product = await Product.find({}).limit(5)

            res.render("index.ejs", {
                pageTitle: "welcome",
                names: product,
                query: req.query.id
            })
        } catch (error) {
            res.status(401).send(error)
        }
    } else {
        res.send("log in as admin")
    }

})

router.get('/add', ensureAdmin, async (req, res) => {
    try {
        // getting the add page
        res.render("add.ejs")

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

router.get('/home', async (req, res) => {
    try {

        // retrieving only the first 5 results
        const products = await Product.find({}).limit(5)

        res.render("index.ejs", {
            pageTitle: "welcome",
            names: products,
            query: req.query.id
        })

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})


router.get('/store', async (req, res) => {
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
            query: req.query.id
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

router.get('/product', async (req, res) => {
    try {

        const product = await Product.findOne({
            _id: req.query.id
        })
        // console.log(req.query.cart)
        // await req.user.populate({
        //     path: "User"
        //     // need to use match to make the parameters

        // }).execPopulate()


        res.render("product.ejs", {
            pageTitle: "welcome",
            name: product,
            query: req.query.id,
            inCart: req.query.inCart
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

router.get('/added', ensureAuthenticated, async (req, res) => {
    try {
        const newP = await Product.findOne({_id: req.query.inCart})
        const user = await User.findByIdAndUpdate({_id: req.session.passport.user}, {$push :{cart: newP._id}})
        await user.save()
        const test = await Product.findOne({_id: user.cart})
        console.log(test)
        // console.log(req.query.cart)
        const products = await Product.find({
        })
        res.redirect("/home")
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})


router.delete("/product/:id", ensureAuthenticated, async (req, res) => {
    try {
        const ID = req.params.id
        const products = await Product.findOneAndDelete({
            _id: ID
            // owner: req.user._id
        })
        if (!products) {
            return res.status(404).send({
                error: "Products not found for given ID " + ID
            })
        }
        res.send(products)
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