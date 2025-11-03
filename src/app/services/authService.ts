import axios from "axios";

const API_URL = "https://backend-om79.onrender.com/api/v1/auth";

// Create axios instance (optional, but good for scaling)
const api = axios.create({
  baseURL: API_URL,
});

// REGISTER user
interface RegisterUserPayload {
    name?: string;
    email: string;
    password: string;
    [key: string]: any;
}

interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
    [key: string]: any;
}

interface User {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
}

interface RegisterResponse {
    user: User;
    tokens: AuthTokens;
    [key: string]: any;
}

export const registerUser = async (userData: RegisterUserPayload): Promise<RegisterResponse> => {
    try {
        const response = await api.post<RegisterResponse>("/register", userData);
        return response.data; // contains user + tokens
    } catch (error: any) {
        // handle errors clearly
        console.error("Registration failed:", error.response?.data || error.message);
        throw error;
    }
};


