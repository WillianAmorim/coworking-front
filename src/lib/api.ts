import axios from "axios";

const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "https://coworking-back-production.up.railway.app/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL_PROD,
  // baseURL: process.env.NEXT_PUBLIC_API_URL_LOCAL,
   headers: {
    'Content-Type': 'application/json',
  },
});

export default api;