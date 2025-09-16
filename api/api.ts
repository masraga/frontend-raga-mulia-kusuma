import axios from "axios";

const baseUrl = "http://202.157.176.100:3001";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
