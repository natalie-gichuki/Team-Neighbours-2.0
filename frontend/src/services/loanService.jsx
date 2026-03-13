import {API_URL} from "../../config";

// Helper token
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
}

export const getAllLoans = async () => {
    const response = await fetch(`${API_URL}/loan`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch Loans"); 
    }

    const data = await response.json();
    return data;
};

// Sends a POST request to the backend to create a new fine
export const createLoan = async (loandata) => {
    const response = await fetch(`${API_URL}/loan`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(loandata)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create loan");
    }

    const data = await response.json();
    return data;
};

// Sends a GET request to the backend to retrieve a specific fine by ID
export const getLoanById = async (id) => {
    const response = await fetch(`${API_URL}/loan/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch specified loan.")
    }

    const data = await response.json();
    return data;
};

// Sends a PUT request to the backend to update a specific fine by ID
export const updateLoan = async (id, loandata) => {
    const response = await fetch(`${API_URL}/loan/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(loandata)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update specified loan.")
    }
    
    const data = await response.json();
    return data;
};

// Sends a DELETE request to the backend to delete a specific fine by ID
export const deleteLoan = async (id) => {
    const response = await fetch(`${API_URL}/loan/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete specified loan.")
    }

    const data = await response.json();
    return data;
};


// Sends a GET request to the backend to retrieve all fines for a specific member 
export const getMemberLoans = async () => {
    const response = await fetch(`${API_URL}/loan/my`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch loans for specified member.")
    }

    const data = await response.json();
    return data;
};

export const loanService = {
    getAllLoans,
    createLoan,
    getLoanById,
    updateLoan,
    deleteLoan,
    getMemberLoans
}

export default loanService;