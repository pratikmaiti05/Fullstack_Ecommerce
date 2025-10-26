import { useContext, useState, useEffect } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"
import axios from "../api/axios"
const BestSeller = () => {
  const [products, setproducts] = useState([])
  const [latestProducts,setlatestProducts]=useState([])
    useEffect(()=>{
      const fetchProducts=async ()=>{
      try {
        const res=await axios.get('/products/getProducts')
        const products=res.data
        setproducts(products)
        setlatestProducts(products.slice(4, 8))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts()
    },[])
     const renderProducts = latestProducts.map((product, idx) => {
  return (
    <div
      key={idx}
      className="h-[30vh] w-[80vw] sm:w-[45vw] md:h-[50vh] md:w-[20vw] flex justify-center items-center flex-col gap-2 md:gap-0 hover:scale-105 transition ease-in-out"
    >
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="h-[20vh] md:h-[35vh] w-full object-contain"
        />
      </Link>
      <h1 className="font-thin">{product.name}</h1>
      <span className="font-thin">{product.price}$</span>
    </div>
  );
});

return (
  <div className="flex gap-8 items-center flex-col px-4 md:px-10">
    {/* Title Section */}
    <div className="flex flex-col md:flex-row gap-3 items-center">
      <h1 className="text-4xl text-gray-500 font-medium">BEST</h1>
      <h1 className="text-4xl font-medium text-gray-800">SELLERS</h1>
      <span className="w-[4vw] h-1 bg-gray-600"></span>
    </div>

    {/* Subtitle */}
    <p className="font-thin text-gray-700 text-center max-w-2xl px-2">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
    </p>

    {/* Products Grid */}
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
      {renderProducts}
    </div>
  </div>
);
}

export default BestSeller