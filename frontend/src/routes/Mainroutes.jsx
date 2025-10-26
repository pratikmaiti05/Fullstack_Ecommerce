import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Collection from '../pages/Collection'
import Orders from '../pages/Orders'
import Placeorder from '../pages/Placeorder'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import Logout from '../pages/Logout'
import  Addproduct  from '../pages/Addproduct'
import Checkout from '../pages/Checkout'
import OrderSuccess from '../pages/OrderSuccess'
const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path="/collection" element={<Collection />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/place-order" element={<Placeorder />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/add-product" element={<Addproduct/>} />
      <Route path="/orders-checkout" element={<Checkout/>} />
      <Route path="/order-success/:id" element={<OrderSuccess/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Mainroutes