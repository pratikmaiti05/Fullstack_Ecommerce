const { publishToQueue } = require('../broker/broker');
const orderModel = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
  try {
    const { shippingInfo, cart, paymentMethod, total } = req.body;
    const userId = req.user._id;
    const items = cart.map(item => ({
      product: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1
    }));
    const order = await orderModel.create({
      user: userId,
      items,
      shippingInfo,
      paymentMethod,
      total
    });
    await publishToQueue('ORDER-PLACED',{
      id:order._id,
      username:req.user.username,
      email:req.user.email,
      status:order.status,
      paymentMethod:order.paymentMethod,
      total:order.total,
      shippingInfo:order.shippingInfo
    })
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Order placement failed" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
exports.allOrders=async(req,res)=>{
  try {
    const orders=await orderModel.find();
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}
exports.orderStatus=async(req,res)=>{
  try {
    const id=req.params.id
    const {status}=req.body
    const order=await orderModel.findById(id)
    order.status=status
    await order.save()
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Status" });
  }
}