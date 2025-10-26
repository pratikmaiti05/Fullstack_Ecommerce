const express=require('express');
const app=express()
const {connect}=require('./broker/broker');
const setListeners=require('./broker/listners');
connect().then(()=>{
  setListeners();
})
const cookieParser=require('cookie-parser')
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute');
const cors = require('cors');
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true               
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/auth',userRoute)
app.use('/products',productRoute)
app.use('/order', orderRoute);
module.exports=app
