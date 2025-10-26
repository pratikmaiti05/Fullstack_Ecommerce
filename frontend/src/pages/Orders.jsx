import { useEffect, useState } from "react";
import axios from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/order/getOrders");
        setOrders(res.data.orders);
        console.log(res.data.orders);
        
      } catch (err) {
        // handle error
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="max-w-5xl mx-auto p-6">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Orders</h2>

  {orders.length === 0 ? (
    <p className="text-gray-500 text-center">No orders found.</p>
  ) : (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-2xl shadow-sm p-5 bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500 font-medium">
              Order ID: {order._id}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
              {order.status}
            </span>
          </div>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Total:</span> ${order.total}
            </p>
            <p>
              <span className="font-medium">Items:</span>{" "}
              {order.items.map((i) => i.name).join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default Orders;