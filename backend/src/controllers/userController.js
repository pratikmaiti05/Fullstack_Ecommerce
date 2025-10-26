const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const { publishToQueue } = require('../broker/broker');
const mongoose=require("mongoose")
async function registerHandler(req,res) {
  try {
     const {username,email,password}=req.body
     if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
     const isUser=await userModel.findOne({email})
      if(isUser){
        return res.status(401).json({
          message:'User Already exists'
        })
      }
      const role=email===process.env.ADMIN_EMAIL ? 'admin' : 'user';
      const user=await userModel.create({
        username,
        email,
        password:await bcrypt.hash(password,10),
        role
      })
      await publishToQueue('AUTH_USER_CREATED',{
        id:user._id,username:user.username,email:user.email
      })
      const token=jwt.sign({
        id:user._id
      },process.env.JWTSECRET_KEY)
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,        // must be true for https (Render uses https)
        sameSite: "none",
        maxAge: 2 * 24 * 60 * 60 * 1000 // required for cross-origin cookies
      });
      res.status(201).json({
        message:`User created as ${role}`,
        user
      })
  } catch (error) {
    console.log(error);
  }
}
async function loginHandler(req,res) {
  const {email,password}=req.body
  if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }
  const user=await userModel.findOne({email})
  if(!user){
    return res.status(401).json({
      message:'Invalid User'
    })
  }
  const isPassword=await bcrypt.compare(password,user.password)
  if(!isPassword){
    return res.status(401).json({
      message:'Invalid Password'
    })
  }
  const token=jwt.sign({
    id:user._id
  },process.env.JWTSECRET_KEY)
  res.cookie('token', token, {
        httpOnly: true,
        secure: true,        // must be true for https (Render uses https)
        sameSite: "none",
        maxAge: 2 * 24 * 60 * 60 * 1000 // required for cross-origin cookies
      });
  res.status(201).json({
    message:'User loggedin',
    user
  })
}
async function logoutHandler(req,res){
  res.cookie('token',null,{
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now())
  })
  return res.status(200).json({ message: 'Logout successful!' });
}
async function toCart(req, res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ product: new mongoose.Types.ObjectId(productId), quantity: 1 });
    }

    await user.save();

    const populatedUser = await user.populate("cart.product");

    res.json({
      message: "Product Added",
      cart: populatedUser.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


async function removeFromCart(req,res) {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    // Remove the cart item by matching product id
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const existingItem = user.cart.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem.quantity>1) {
      existingItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
      (item) => item.product && item.product.toString() !== productId
    );
    }
    await user.save();
    res.json({
      message: "Product Deleted"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
async function cartItems(req,res) {
  const user=await userModel.findOne({email:req.user.email}).populate("cart.product")
  res.json({
    user
  })
  
}


module.exports={
  registerHandler,
  loginHandler,
  logoutHandler,
  toCart,
  cartItems,
  removeFromCart
}
