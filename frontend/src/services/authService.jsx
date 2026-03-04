import { API_URL } from "../../config";

// Sends a POST request to the backend to log in a user

const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    localStorage.setItem('token', data.access_token);
    return data; // This should include the user info and token
}

// Sends a POST request to the backend to register a new user
const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Register failed");
    }

    const data = await response.json();
    return data;
}

const getToken = () => {
    return localStorage.getItem('token');
};

export const authService = {
    login,
    register,
    getToken
};

export default authService;