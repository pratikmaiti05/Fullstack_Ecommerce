import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import Customer from "../components/Customer";
import Footer from "../components/Footer";
import Subscribe from "../components/Subscribe";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [latestProducts, setlatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      
      try {
        const res = await axios.get("/products/getProducts");
        const products = res.data;
        setproducts(products);
        setlatestProducts(products.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  });
 

  const renderProducts = latestProducts.map((product, idx) => {
    return (
      <div
        key={idx}
        className="w-[45%] sm:w-[30%] md:w-[20%] flex flex-col justify-center items-center gap-2 p-2 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <Link to={`/product/${product._id}`} className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-[150px] sm:h-[200px] md:h-[250px] w-full object-contain"
          />
        </Link>
        <h1 className="font-medium text-sm sm:text-base text-center line-clamp-1">
          {product.name}
        </h1>
        <span className="font-medium text-gray-700">${product.price}</span>
      </div>
    );
  });

  return (
    <div className="md:p-10 flex flex-col gap-10 items-center">
      <Hero />
      <LatestCollection />

      {/* Product Grid */}
      <div className="flex flex-wrap justify-center gap-5 w-full max-w-6xl">
        {renderProducts}
      </div>

      <BestSeller />
      <Customer />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
