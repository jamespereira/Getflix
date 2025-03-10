import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
