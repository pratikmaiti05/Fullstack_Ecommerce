const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  },
  cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
],
//  cart:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"product"
//   }],
})
const userModel=mongoose.model('user',userSchema);
module.exports=userModel