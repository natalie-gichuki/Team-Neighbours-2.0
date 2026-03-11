import { API_URL } from "../../config";

// Helper token
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
};

// Sends a GET request to show all members
export const getMembers = async () => {
    const response = await fetch(`${API_URL}/member`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getAuthHeaders()}`
        }
    });
    return response.json();
};

// Sends a GET request to show a specific member by ID
export const getMemberById = async (id) => {
    const response = await fetch(`${API_URL}/member/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getAuthHeaders()}`
        }
    });
    return response.json();
};

// Send a PATCH request to disable a member (admin only)
export const disableMember = async (id) => {
    const response = await fetch(`${API_URL}/member/${id}/disabled`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to disable member");
    }

    return response.json();
};

// Send a PATCH request to enable a member (admin only)
export const enableMember = async (id) => {
    const response = await fetch(`${API_URL}/member/${id}/enable`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enable member");
    }

    return response.json();
};

// Send GET request to retrieved all disabled members (admin only)
export const getDisabledMembers = async () => {
    const response = await fetch(`${API_URL}/member/disabled`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch disabled members");
    }

    return response.json();
};

// Send a PATCH request to update member details 
export const updateMember = async (id, memberData) => {
    const response = await fetch(`${API_URL}/member/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(memberData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update member");
    }

    return response.json();
};

export const memberService = {
    getMembers,
    getMemberById,
    disableMember,
    enableMember,
    getDisabledMembers,
    updateMember
};

export default memberService;
