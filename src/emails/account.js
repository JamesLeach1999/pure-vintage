// this is all the code, using the sendgrid api, used to set the variables and send mail
// much nicer to do it here instead of in routers
const sgMail = require("@sendgrid/mail")
const Product = require("../models/Products")
// still need the process.env to access environment variables
sgMail.setApiKey(process.env.SG_API_KEY)
// surprisingly easy this. can pass in html to make it styled 

// send returns a promise
const sendWelcome = (email, name) => {
    console.log("numberwang")
    sgMail.send({
        to: email,
        from: "jimalomalom@hotmail.com",
        subject: "welcome",
        text: `welcome to pure vintage ${name}`
    }).then(() => {
        console.log("yes")
    }).catch((error) => {
        console.log(error.body)
    })
}

const sendCancel = (email, name) => {
    sgMail.send({
        to: email,
        from: "jadlljames@gmail.com",
        subject: "welcome",
        text: `sorry to see you go ${name}`
    })
}

const orderConf = (email, name, item) => {

    var product = []
    if(item.length > 0){
        item.forEach(pro => {
            product.push(pro)
        })
        product.toString()
    } else {
        product.push(item)
    }

    // console.log(product)
    sgMail.send({
        to: email,
        from: "jimalomalom@hotmail.com",
        subject: "welcome",
        text: `stahnks ${name} for ordering:  ${product}`
    })
}
// will deal with this later. meant to be a helper function for pagnintation

var filter = async function (query) {
    var match = {}
    // match.category = category
    // match.brand = brand
    // match.size = size
console.log(query)
    var items = []
    var category = []
    var brand = []
    var size = []
    if(query.category){
        // console.log(query.category[0])
        var g = query.category.split(" ")
        // console.log(g)
        // var t = query.category
        // console.log(g)
        category = g
        // for(var t = 0; t < g.length; t++){
        // }
        // console.log(category)
    }
    if(query.brand){
        var k = query.brand.split(" ")
        // console.log(k)
        brand = k
    }
    if(query.size){
        var j = query.size.split(" ")
        // console.log(j)
        size = j
    }
    var products

    if(query.category && query.brand && query.size){
        products = await Product.find({
            $and: [{category: category}, {brand: brand}, {size: size}]
        }
        )
    } else if( query.category && query.size){
        products = await Product.find({
            $and: [{category: category},  {size: size}]
        }
        )
    } else if( query.category && query.size){
        products = await Product.find({
            $and: [{category: category}, {brand: brand}, {size: size}]
        }
        )
    } else if( query.brand && query.size){
        products = await Product.find({
            $and: [ {brand: brand}, {size: size}]
        }
        )
    } else if( query.category && query.brand){
        products = await Product.find({
            $and: [{category: category}, {brand: brand}]
        }
        )
    } else if( query.category){
        products = await Product.find({
            category: category
        }
        )
    } else if( query.brand){
        products = await Product.find({
            brand: brand
        }
        )
    } else if( query.size){
        products = await Product.find({
            size: size
        }
        )
    }
    // console.log(products)

    return products
    
    // console.log(brand)
}



// this is just to export many things
module.exports = {sendWelcome, sendCancel, filter, orderConf}
