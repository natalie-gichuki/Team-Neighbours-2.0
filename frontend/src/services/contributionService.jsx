import { API_URL } from "../../config";

// Helper token 
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
};

// Sends a POST request to the backend to create a new contribution
export const createContribution = async (contributionData) => {
    const response = await fetch(`${API_URL}/contribution`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(contributionData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create contribution");
    }

    const data = await response.json();
    return data;
};

// Sends a GET request to the backend to retrieve all contributions
export const getContributions = async () => {
    const response = await fetch(`${API_URL}/contribution`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch contributions");
    }

    const data = await response.json();
    return data;
};

// Sends a GET request to the backend to retrieve a specific contribution by ID
export const getContributionById = async (id) => {
    const response = await fetch(`${API_URL}/contribution/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch specified contriution.")
    }

    const data = await response.json();
    return data;
};


// Sends a DELETE request to the backend to delete a specific contribution by ID
export const deleteContribution = async (id) => {
    const response = await fetch(`${API_URL}/contribution/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete contribution");
    }

    const data = await response.json();
    return data;
};


// Sends a PUT request to the backend to update a specific contribution by ID
export const updateContribution = async (id, contributionData) => {
    const response = await fetch(`${API_URL}/contribution/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(contributionData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update contribution");
    }

    const data = await response.json();
    return data;
};

export const contributionService = {
    createContribution,
    getContributions,
    getContributionById,
    deleteContribution,
    updateContribution
};

export default contributionService;

