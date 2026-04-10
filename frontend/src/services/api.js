import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstack-ecommerce-mz3v.onrender.com"
});

export default API;
