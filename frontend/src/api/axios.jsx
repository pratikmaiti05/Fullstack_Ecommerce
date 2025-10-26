import axios from 'axios'
const instance=axios.create({
  baseURL: "https://fullstack-ecommerce-backend-i8g8.onrender.com",
  withCredentials:true
})
export default instance
