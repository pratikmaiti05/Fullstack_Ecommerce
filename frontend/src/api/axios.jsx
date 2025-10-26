import axios from 'axios'
const instance=axios.create({
  baseURL: "https://fullstack-ecommerce-backend-bezw.onrender.com",
  withCredentials:true
})
export default instance
