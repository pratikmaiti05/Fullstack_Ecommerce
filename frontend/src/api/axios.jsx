import axios from 'axios'
const instance=axios.create({
  baseURL: "https://fullstack-ecommerce-backend-ozwz.onrender.com",
  withCredentials:true
})
export default instance
