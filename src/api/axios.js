// src/axios.js
import axios from "@axios";
import { refreshToken } from './services/auth';  // Ensure this path is correct

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual API base URL
});

// Add interceptor to the axiosInstance


// Add a request interceptor to inject the auth token
axiosInstance.interceptors.request.use(config => {
  console.log("Sending request to:", config.url);
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization Header Set:", config.headers['Authorization']);
  }
  return config;
}, error => {
  console.error("Error in request setup:", error);
  return Promise.reject(error);
});

export default axiosInstance;
