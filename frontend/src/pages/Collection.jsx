import { useContext,useEffect,useState } from "react"
import { ShopContext } from "../context/ShopContext"
import Footer from "../components/Footer";
import { Link } from "react-router-dom"
import axios from "../api/axios"

const Collection = () => {
  const [products, setproducts] = useState([])
  const [filterProducts, setfilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [search, setSearch] = useState("");

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const res=await axios.get('/products/getProducts')
        const products = res.data;
        setproducts(products)
        setfilterProducts(products)
    } catch (error) {
        console.error("Error fetching products:", error);
    }
  }
  fetchProducts()
  },[])

  const toggleFunc=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }
  }

  const subtoggleFunc=(e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setsubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter=async (e)=>{
    if(!products.length)  return;
    let productCopy=products.slice();
    if (category.length>0) {
      productCopy=productCopy.filter(item=>category.includes(item.category));
    }
    if (subCategory.length>0) {
      productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory));
    }
    if (search.trim().length > 0) {
      try {
        const res=await axios.get(`/products/searchProduct?q=${search}`)
        productCopy=res.data.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    setfilterProducts(productCopy);
  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory,search])

  const renderProducts=filterProducts.map((product,idx)=>{
    return (
      <div 
        key={idx} 
        className="h-[35vh] sm:h-[40vh] w-[80vw] sm:w-[45vw] md:w-[22vw] lg:w-[15vw] flex flex-col hover:scale-105 transition ease-in-out"
      >
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            className="h-[25vh] sm:h-[30vh] md:h-[35vh] w-full object-contain rounded-lg"
          />
        </Link>
        <h1 className="font-thin text-sm sm:text-base">{product.name}</h1>
        <span className="font-thin text-sm sm:text-base">{product.price}$</span>
      </div>
    )
  })

  return (
    <div className="w-full min-h-screen flex flex-col py-5 px-4 md:px-10 gap-10">
      <div className="w-full border border-gray-200"></div>

      {/* Search Input */}
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
        {/* Filters */}
        <div className="flex flex-col gap-7 w-full md:w-[25vw]">
          <h1 className="text-2xl md:text-3xl">FILTERS</h1>

          <div className="w-full border border-gray-300 flex flex-col py-3 px-5 sm:px-10 items-start gap-3 rounded-lg">
            <h1 className="font-bold">CATEGORIES</h1>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Men'} onChange={toggleFunc}/>Men
            </p>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Women'} onChange={toggleFunc}/>Women
            </p>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Kids'} onChange={toggleFunc}/>Kids
            </p>
          </div>

          <div className="w-full border border-gray-300 flex flex-col py-3 px-5 sm:px-10 items-start gap-3 rounded-lg">
            <h1 className="font-bold">TYPE</h1>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Topwear'} onChange={subtoggleFunc}/>Topwear
            </p>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Bottomwear'} onChange={subtoggleFunc}/>Bottomwear
            </p>
            <p className="flex gap-2 text-gray-500 text-sm sm:text-base">
              <input type="checkbox" value={'Winterwear'} onChange={subtoggleFunc}/>Winterwear
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl text-gray-500 font-medium">ALL</h1>
            <h1 className="text-xl md:text-2xl font-medium text-gray-800">COLLECTIONS</h1>
            <span className='w-[20vw] sm:w-[10vw] md:w-[4vw] h-1 bg-gray-600'></span>
          </div>

          <div className="flex justify-center md:justify-start flex-wrap gap-6 md:gap-10">
            {renderProducts}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Collection
