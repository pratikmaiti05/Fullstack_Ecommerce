import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      console.log(res)
      toast.success("Account Created");
      setTimeout(()=>{
        navigate('/')
      },1300)
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-full flex flex-col pb-10">
  <div className="w-full flex flex-col justify-center items-center gap-5 pt-30">
    {/* Title */}
    <div className="w-full flex gap-3 justify-center items-center">
      <h1 className="text-3xl font-medium text-gray-800">Sign Up</h1>
      <span className="w-[20vw] sm:w-[10vw] md:w-[4vw] h-0.5 bg-gray-600"></span>
    </div>

    {/* Form */}
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-5 items-center w-full"
    >
      <input
        type="text"
        placeholder="Username"
        className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[25vw] p-3 border outline-none border-gray-200 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[25vw] p-3 border outline-none border-gray-200 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[25vw] p-3 border outline-none border-gray-200 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[25vw] flex justify-end">
        <Link to="/login" className="text-sm sm:text-base">
          Login
        </Link>
      </div>

      <button
        type="submit"
        className="border-1 px-6 sm:px-10 py-2 hover:bg-black hover:text-white duration-300 rounded-md text-xl sm:text-2xl"
      >
        Sign Up
      </button>
    </form>
  </div>

  <ToastContainer />
  <Footer />
</div>
  );
};

export default Register;
