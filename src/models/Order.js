const mongoose = require('mongoose');

const shippingSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, default: 'card' },
};

// const orderItemSchema = new mongoose.Schema({});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.Mixed, required: true },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }],
    shipping: shippingSchema,
    payment: paymentSchema,
    // itemsPrice: { type: Number },
    // shippingPrice: { type: Number },
    totalPrice: { type: Number },
    intent: { type: String },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    // isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
