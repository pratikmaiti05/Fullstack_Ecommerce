import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { useEffect,useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Product = () => {
  const [items, setitems] = useState([])
  const [loggedIn, setloggedIn] = useState(false)
  const {id}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchProduct=async ()=>{
      const res=await axios.get(`/products/getProduct/${id}`)
      const product=res.data;
      console.log(product);
      
      setitems(product)
    }
    fetchProduct()
  },[])
  useEffect(()=>{
    const fetchUser=async ()=>{
      try {
        const res=await axios.get(`/auth/me`)
        const user=res.data;
        console.log(user);
        setloggedIn(true)
      } catch (error) {
        toast.error('Login first to access')
        setTimeout(()=>{
          navigate('/')
        },1000)
        setloggedIn(false)
      }
      
    }
    fetchUser()
  },[])
  const cartHandler=async ()=>{
    try {
      await axios.post(`/auth/cart/${id}`)
      toast.success("Added to cart")
    } catch (error) {
      console.log('Product Not found');
    }
  }
  return (
   <>
  {loggedIn && (
    <div className="flex flex-col gap-10 px-4 md:px-10 lg:px-20 pb-10">
      <div className="w-full border border-gray-200"></div>

      {/* Product Section */}
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={items.image}
            alt={items.name}
            className="h-[40vh] sm:h-[50vh] lg:h-[55vh] w-full sm:w-[60%] lg:w-[25vw] object-contain"
          />
        </div>

        {/* Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-2xl sm:text-3xl font-medium">{items.name}</h1>
          <h1 className="text-xl sm:text-2xl font-bold">${items.price}</h1>
          <p className="text-gray-500 font-thin text-sm sm:text-base">{items.description}</p>

          {/* Size Options */}
          {/* Add to Cart */}
          <button
            className="px-4 py-2 rounded-lg font-medium text-base sm:text-lg text-black border border-black hover:bg-black hover:text-white transition duration-300"
            onClick={cartHandler}
          >
            Add to Cart
          </button>

          <div className="w-full border border-gray-200"></div>

          {/* Info List */}
          <ul className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base">
            <li className="text-gray-500">100% Original product.</li>
            <li className="text-gray-500">Cash on delivery is available on this product.</li>
            <li className="text-gray-500">Easy return and exchange policy within 7 days.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )}
  <ToastContainer />
</>

  )
}

export default Product