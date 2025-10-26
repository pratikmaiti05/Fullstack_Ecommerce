import { useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Confirmed!</h1>
      <p className="mt-2">Your order ID: <span className="font-mono">{id}</span></p>
      <p className="mt-2 text-gray-600">We’ll notify you when it ships.</p>
    </div>
  );
};

export default OrderSuccess;
