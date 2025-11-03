// services/authService.ts
import axios from "axios";

const API_URL = "https://backend-om79.onrender.com/api/v1/auth";

const api = axios.create({ baseURL: API_URL });

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", data);
    return response.data;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};
