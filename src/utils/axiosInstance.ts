import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.omdbapi.com/", // Set base URL for all API calls
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
