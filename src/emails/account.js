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

// will deal with this later. meant to be a helper function for pagnintation

// this is just to export many things
module.exports = {sendWelcome, sendCancel}
