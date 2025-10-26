import Footer from "../components/Footer"
import axios from "../api/axios"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"

const Cart = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/auth/cart-Items");
      setProducts(res.data.user.cart || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const removeHandler = async (productId) => {
    await axios.post(`/auth/removeFrom-cart/${productId}`);
    toast.success("Product removed from cart");
    fetchProducts();
  };
  const subtotal = products.reduce(
    (total, item) => total + ((item.product?.price || 0) - (item.product?.discount || 0)) * (item.quantity || 1),
    0
  );
  const shipping = products.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 flex flex-col gap-10">
  {/* Header */}
  <div className="flex gap-3 items-center justify-center sm:justify-start">
    <h1 className="text-xl sm:text-2xl text-gray-500 font-medium">YOUR</h1>
    <h1 className="text-xl sm:text-2xl font-medium text-gray-800">CART</h1>
    <span className="w-[20vw] sm:w-[8vw] lg:w-[4vw] h-1 bg-gray-600"></span>
  </div>

  {/* Cart items */}
  <div className="flex flex-col gap-5">
    {products.length === 0 ? (
      <p className="text-gray-500 text-lg text-center sm:text-left">
        Your cart is empty.
      </p>
    ) : (
      products.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 border p-4 rounded-xl shadow-sm"
        >
          {/* Product Info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={item.product?.image || "https://via.placeholder.com/80"}
              alt={item.product?.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                {item.product?.name}
              </h2>
              <p className="text-gray-500 text-sm">
                {item.product?.category} - {item.product?.size}
              </p>
              <p className="text-gray-700 font-medium">
                ${item.product?.price - (item.product?.discount || 0)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <input
              type="number"
              value={item.quantity || 1}
              readOnly
              className="w-16 border rounded-lg text-center p-1"
            />
            <button
              className="text-red-500 font-medium hover:underline"
              onClick={() => removeHandler(item.product?._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Totals */}
  {products.length > 0 && (
    <div className="flex flex-col items-center sm:items-end gap-5 mt-10">
      <div className="flex flex-col gap-3 border p-5 rounded-xl shadow-md w-full sm:w-[70%] lg:w-[30vw]">
        <p className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <hr className="text-gray-200" />
        <p className="flex justify-between text-sm sm:text-base">
          <span className="font-medium">Shipping Fee</span>
          <span>${shipping.toFixed(2)}</span>
        </p>
        <hr className="text-gray-200" />
        <p className="flex justify-between text-sm sm:text-base">
          <span className="font-bold">Total</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </p>
        <Link className="w-full flex justify-end" to={"/orders-checkout"}>
          <button className="bg-black text-white py-2 px-5 rounded-lg mt-3 hover:bg-gray-800 transition">
            PROCEED TO CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  )}

  <ToastContainer />
  <Footer />
</div>

  )
}

export default Cart