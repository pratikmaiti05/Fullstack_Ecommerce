import axios from "../api/axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart items for the logged-in user
  const fetchCart = async () => {
    try {
      const res = await axios.get("/auth/cart-Items");
      setCart(res.data.user.cart || []);
    } catch (error) {
      toast.error("Failed to fetch cart items");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.product.price, 0);
  const shipping = cart.length > 0 ? 20 : 0;
  const totalAmount = total + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Place order and redirect to success page
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/order/place-order",
        {
          shippingInfo: formData,
          cart,
          paymentMethod: formData.paymentMethod,
          total: totalAmount,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      
      toast.success("Order placed successfully!");
      setTimeout(() => {
        navigate(`/order-success/${res.data.order._id}`);
      }, 1500);
    } catch (err) {
      toast.error("Order failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: User Info */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                checked={formData.paymentMethod === "Online"}
                onChange={handleChange}
              />
              Online Payment
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>

      {/* Right: Cart Summary */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                </div>
                <p>${item.product.price}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Shipping Fee</span>
          <span>${shipping}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>${totalAmount}</span>
        </div>
        <Link
          to="/cart"
          className="block mt-4 text-blue-600 hover:underline text-sm"
        >
          Edit Cart
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
