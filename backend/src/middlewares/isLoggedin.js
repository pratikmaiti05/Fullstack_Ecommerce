const jwt=require('jsonwebtoken')
const userModel=require('../models/userModel')
async function isLoggedin(req,res,next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
module.exports={isLoggedin}