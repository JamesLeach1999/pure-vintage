const mongoose = require("mongoose")

const shippingSchema = {
    house: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true }

  };
  
  const paymentSchema = {
    paymentMethod: { type: String, default: "card" }
  };
  
  const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  });
  
  const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{type: String}],
    shipping: shippingSchema,
    payment: paymentSchema,
    // itemsPrice: { type: Number },
    // shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    // isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Order', orderSchema);