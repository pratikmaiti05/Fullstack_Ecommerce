const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      name: String,
      price: Number,
    }
  ],
  shippingInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
  },
  paymentMethod: { type: String, enum: ['COD', 'Online'], default: 'COD' },
  total: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });
const orderModel=mongoose.model('order',orderSchema)
module.exports = orderModel