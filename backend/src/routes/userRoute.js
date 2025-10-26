const express=require('express')
const { registerHandler, loginHandler, logoutHandler, toCart, cartItems, removeFromCart } = require('../controllers/userController')
const { isLoggedin } = require('../middlewares/isLoggedin')
const router=express.Router()
router.post('/register',registerHandler)
router.post('/login',loginHandler)
router.get('/logout',logoutHandler)
router.get('/me', isLoggedin,(req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  });
});
router.post('/cart/:id',isLoggedin,toCart)
router.post('/removeFrom-cart/:id',isLoggedin,removeFromCart)
router.get('/cart-Items',isLoggedin,cartItems)
module.exports=router