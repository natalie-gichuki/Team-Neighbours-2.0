import {API_URL} from "../../config";

// Helper token
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
}

export const getAllFines = async () => {
    const response = await fetch(`${API_URL}/fine`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Fines"); 
    }

    const data = await response.json();
    return data;
};

// Sends a POST request to the backend to create a new fine
export const createFine = async (finedata) => {
    const response = await fetch(`${API_URL}/fine`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(finedata)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create fine");
    }

    const data = await response.json();
    return data;
};

// Sends a GET request to the backend to retrieve a specific fine by ID
export const getFineById = async (id) => {
    const response = await fetch(`${API_URL}/fine/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch specified fine.")
    }

    const data = await response.json();
    return data;
};

// Sends a PUT request to the backend to update a specific fine by ID
export const updateFine = async (id, finedata) => {
    const response = await fetch(`${API_URL}/fine/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(finedata)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update specified fine.")
    }
    
    const data = await response.json();
    return data;
};

// Sends a DELETE request to the backend to delete a specific fine by ID
export const deleteFine = async (id) => {
    const response = await fetch(`${API_URL}/fine/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete specified fine.")
    }

    const data = await response.json();
    return data;
};


// Sends a GET request to the backend to retrieve all fines for a specific member 
export const getMemberFines = async () => {
    const response = await fetch(`${API_URL}/fine/my`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch fines for specified member.")
    }

    const data = await response.json();
    return data;
};

export const fineService = {
    getAllFines,
    createFine,
    getFineById,
    updateFine,
    deleteFine,
    getMemberFines
}