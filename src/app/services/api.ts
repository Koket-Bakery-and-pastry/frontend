import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://backend-om79.onrender.com/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
