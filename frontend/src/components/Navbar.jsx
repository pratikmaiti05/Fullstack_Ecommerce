import { Link, NavLink, useNavigate } from "react-router-dom"
import {assets} from "../assets/assets"
import axios from "../api/axios"
import { useEffect,useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const [loggedIn, setloggedIn] = useState(false)
  const [isAdmin, setisAdmin] = useState()
  const [products, setproducts] = useState([])
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const loginCheck = async () => {
      try {
        const res=await axios.get("/auth/me", { withCredentials: true })
        setloggedIn(true)
        setisAdmin(res.data.user.role==='admin')
      } catch (error) {
        if (error.response?.status === 401) {
        setloggedIn(false);
        setisAdmin(false);
        } 
      }
    }
    loginCheck()
  })
  useEffect(() => {
      if (!loggedIn) return; // Only fetch if logged in
      const fetchProducts = async () => {
        try {
          const res = await axios.get("/auth/cart-Items", { withCredentials: true });
          setproducts(res.data.user.cart || []);
        } catch (error) {
          if (error.response?.status === 401) {
            setloggedIn(false);
            setproducts([]);
          }
        }
      };
      fetchProducts();
    })
  const navigate=useNavigate()
  const logoutHandler=async(e)=>{
    e.preventDefault()
    try {
      await axios.get('/auth/logout',{withCredentials:true})
      setloggedIn(false)
      toast.success("Logout successful!")
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
    return (
   <>
      <div className="flex items-center justify-between py-4 mb-5 px-6 md:py-5 md:px-10 shadow-sm bg-white">
        {/* Logo */}
        <img src={assets.logo} alt="Logo" className="h-8 md:h-10 cursor-pointer" />
        {/* Desktop Nav */}
        <nav className="hidden md:flex md:gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-black border-b-2" : "text-gray-600 hover:text-black"}>
            Home
          </NavLink>
          <NavLink to="/collection" className={({ isActive }) => isActive ? "text-black border-b-2" : "text-gray-600 hover:text-black"}>
            Collection
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-black border-b-2" : "text-gray-600 hover:text-black"}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-black border-b-2" : "text-gray-600 hover:text-black"}>
            Contact
          </NavLink>

          {loggedIn && isAdmin && (
            <NavLink to="/admin/add-product" className={({ isActive }) => isActive ? "bg-black text-white px-3 py-1 rounded-lg" : "bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"}>
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Profile */}
          <div className="relative group hidden md:block">
            <img src={assets.profile_icon} alt="profile" className="w-6 cursor-pointer" />
            <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl p-3 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-300 z-10 border border-gray-100">
              <ul className="flex flex-col gap-2 text-gray-600">
                {loggedIn ? (
                  <>
                    <li className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                      <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                      <button onClick={logoutHandler} className="w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Cart */}
          {loggedIn && (
            <Link to="/cart" className="relative hidden md:block">
              <img src={assets.cart_icon} alt="cart" className="w-6 cursor-pointer" />
              {products.length > 0 && (
                <span className="absolute -right-2 -bottom-2 bg-black text-white text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full">
                  {products.length}
                </span>
              )}
            </Link>
          )}

          {/* Hamburger for Mobile */}
          <div
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </div>
        </div>
        <ToastContainer />
      </div>

      {/* Mobile Menu (toggle) */}
      {menuOpen && (
        <div className="flex flex-col gap-4 px-6 py-4 md:hidden bg-gray-50 border-t">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="text-gray-700">Home</NavLink>
          <NavLink to="/collection" onClick={() => setMenuOpen(false)} className="text-gray-700">Collection</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className="text-gray-700">About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="text-gray-700">Contact</NavLink>
          {loggedIn && isAdmin && (
            <NavLink to="/admin/add-product" onClick={() => setMenuOpen(false)} className="text-gray-700">Admin Panel</NavLink>
          )}
          {loggedIn ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="text-gray-700">Orders</Link>
              <button onClick={logoutHandler} className="text-gray-700 text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700">Login</Link>
          )}
          {loggedIn && (
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-700">Cart ({products.length})</Link>
          )}
        </div>
      )}
    </>
  );

}

export default Navbar