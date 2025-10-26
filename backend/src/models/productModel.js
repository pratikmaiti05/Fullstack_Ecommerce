const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
  image:String,
  name:String,
  price:Number,
  description:String,
  category:String,
  subCategory:String,
  size:String
})
const productModel=mongoose.model('product',productSchema)
module.exports=productModel