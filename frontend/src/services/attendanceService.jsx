import { API_URL } from "../../config";

// Helper token
const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
};

// Sends a POST request to the backend to create a new attendance record
export const createAttendance = async (attendanceData) => {
    const response = await fetch(`${API_URL}/attendance`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(attendanceData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create attendance record");
    }

    const data = await response.json();
    return data;
};

// Sends a GET request to the backend to retrieve all attendance records
export const getAttendances = async () => {
    const response = await fetch(`${API_URL}/attendance`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch attendance records");
    }

    const data = await response.json();
    return data;
};


// Sends a GET request to the backend to retrieve a specific attendance record by ID
export const getAttendanceById = async (id) => {
    const response = await fetch(`${API_URL}/attendance/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    }); 

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch specified attendance record.")
    }

    const data = await response.json();
    return data;
};

// Sends a DELETE request to the backend to delete a specific attendance record by ID
export const deleteAttendance = async (id) => {
    const response = await fetch(`${API_URL}/attendance/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete attendance record");
    }
    
    return response.json();
};

export const getMyAttendances = async () => {
    const response = await fetch(`${API_URL}/attendance/my`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAuthHeaders()}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch your attendance records");
    }

    const data = await response.json();
    return data;
};

export const updateAttendance = async (id, attendanceData) => {
    const response = await fetch(`${API_URL}/attendance/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthHeaders()}`
        },
        body: JSON.stringify(attendanceData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update attendance record");
    }

    const data = await response.json();
    return data;
};

export const attendanceService = {
    createAttendance,
    getAttendances,
    getAttendanceById,
    getMyAttendances,
    deleteAttendance,
    updateAttendance
}
