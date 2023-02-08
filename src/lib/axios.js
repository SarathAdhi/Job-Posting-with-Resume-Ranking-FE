import Axios from "axios";
import { toast } from "react-hot-toast";

const axios = Axios.create({
  baseURL: "http://192.168.1.5:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response?.data;
  },
  (error) => {
    if (error.response?.data) {
      toast.error(error.response?.data?.error);
    }

    return Promise.reject(error.response?.data);
  }
);

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default axios;
