import axios from "../api/axios.jsx"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Logout = () => {
  const navigate=useNavigate()
  const toHome=()=>{
    navigate('/')
  }
  const logout=async ()=>{
    try {
      const res=await axios.get(
      "/auth/logout",
      {withCredentials:true}
    )
    toast.success(res.data.message || "Logout successful!", {
        position: "top-right",
        autoClose: 3000,
        onClose:navigate('/')
      });
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    
  }
  return (
    <div className="w-full flex justify-center items-center pt-30">
      <div className="h-[25vh] shadow flex flex-col justify-center items-center gap-15 px-20">
        <h1 className="text-3xl">Do You Confirm?</h1>
        <div className="w-full flex justify-between">
          <button className="bg-blue-600 text-white text-thin px-10 py-2 rounded-lg cursor-pointer" onClick={toHome}>NO</button>
          <button className="bg-red-600 text-white text-thin px-10 py-2 rounded-lg 
          cursor-pointer" onClick={logout}>Yes</button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Logout