import { apiClient } from "./api";

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
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  } catch (err: any) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};
