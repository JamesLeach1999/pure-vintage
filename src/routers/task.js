const router = require("express").Router()
const User = require("../models/products")
const verify = require("../validation/validation")
const auth = require("../middleware/auth")
const Product = require("../models/products")
const jwt = require("jsonwebtoken")


router.post('/products', auth, async (req, res) => {
    // const Products = new Products(req.body)
    console.log(req.user.isAdmin)
    if (!req.user.isAdmin) {
        return res.status(401).send("please log in as admin")
    }

    const products = new Product({
        ...req.body,
        owner: req.user._id
    })
    try {
        await products.save()
        res.status(201).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/products', async (req, res) => {
    try {
        // console.log(await Product.find({}))
        const products = await Product.find({})
        res.render("index.ejs", {
            pageTitle: "welcome",
            names: products,
            query: req.query.id
        })

    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})

router.get('/product', async (req, res) => {
    try {
        console.log(await Product.find({_id: req.query.id}))
        const product = await Product.findOne({_id: req.query.id})
        res.render("product.ejs", {
            pageTitle: "welcome",
            name: product,
            query: req.query.id
        })
    } catch (error) {
        res.status(400).send(error + "numberwang")
    }
})


router.delete("/products/:id", auth, async (req, res) => {
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




router.patch('/products/:id', auth, async (req, res) => {

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