import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { attendanceService } from "../../services/attendanceService";

// Async thunk to fetch all attendance records (admin only)
export const fetchAllAttendances = createAsyncThunk(
    "attendance/fetchAllAttendances",
    async (_, thunkAPI) => {
        try {
            const response = await attendanceService.getAttendances();
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }   
);

// Async thunk to fetch a specific attendance record by ID (admin only)
export const fetchAttendanceById = createAsyncThunk(
    "attendance/fetchAttendanceById",
    async (id, thunkAPI) => {
        try {
            const response = await attendanceService.getAttendanceById(id);
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to delete a specific attendance record by ID (admin only)
export const deleteAttendance = createAsyncThunk(
    "attendance/deleteAttendance",
    async (id, thunkAPI) => {
        try {
            const response = await attendanceService.deleteAttendance(id);
            thunkAPI.dispatch(fetchAllAttendances()); // Refresh attendances list after deletion
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch the logged-in user's attendance records
export const fetchMyAttendances = createAsyncThunk(
    "attendance/fetchMyAttendances",
    async (_, thunkAPI) => {
        try {
            const response = await attendanceService.getMyAttendances();
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to create a new attendance record (admin only)
export const createAttendance = createAsyncThunk(
    "attendance/createAttendance",
    async (attendanceData, thunkAPI) => {
        try {
            const response = await attendanceService.createAttendance(attendanceData);
            thunkAPI.dispatch(fetchAllAttendances()); 
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
);

// Async thunk to update an existing attendance record (admin only)
export const updateAttendance = createAsyncThunk(
    "attendance/updateAttendance",
    async ({ id, attendanceData }, thunkAPI) => {
        try {
            const response = await attendanceService.updateAttendance(id, attendanceData);
            thunkAPI.dispatch(fetchAllAttendances()); // Refresh attendances list after update
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        attendances: [],
        myAttendances: [],
        selectedAttendance: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAttendances.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAttendances.fulfilled, (state, action) => {
                state.loading = false;
                state.attendances = action.payload;
            })
            .addCase(fetchAllAttendances.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAttendanceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAttendanceById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAttendance = action.payload;
            })
            .addCase(fetchAttendanceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyAttendances.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyAttendances.fulfilled, (state, action) => {
                state.loading = false;
                state.myAttendances = action.payload;
            })
            .addCase(fetchMyAttendances.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createAttendance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAttendance.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAttendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAttendance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAttendance.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateAttendance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default attendanceSlice.reducer;
