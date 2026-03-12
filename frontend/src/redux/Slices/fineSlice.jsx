import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fineService } from "../../services/fineService";

// Async thunk to fetch all fines for the current member
export const fetchAllFines = createAsyncThunk(
    "fine/fetchAllFines",
    async (_, thunkAPI) => {
        try {
            const response = await fineService.getAllFines();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch a specific fine by ID (admin only)
export const fetchFineById = createAsyncThunk(
    "fine/fetchFineById",
    async (id, thunkAPI) => {
        try {
            const response = await fineService.getFineById(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to update a specific fine by ID (admin only)
export const updateFine = createAsyncThunk(
    "fine/updateFine",
    async ({ id, finedata }, thunkAPI) => {
        try {
            const response = await fineService.updateFine(id, finedata);
            thunkAPI.dispatch(fetchAllFines()); // Refresh fines list after update
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to delete a specific fine by ID (admin only)
export const deleteFine = createAsyncThunk(
    "fine/deleteFine",
    async (id, thunkAPI) => {
        try {
            const response = await fineService.deleteFine(id);
            thunkAPI.dispatch(fetchAllFines()); // Refresh fines list after deletion
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch all fines for a member
export const fetchMyFines = createAsyncThunk(
    "fines/fetchMyFines",
    async (_, thunkAPI) => {
        try {
            return await fineService.getMemberFines();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Create fine (admin)
export const createFine = createAsyncThunk(
    "fine/createFine",
    async (fineData, thunkAPI) => {
        try {
            const response = await fineService.createFine(fineData);
            thunkAPI.dispatch(fetchAllFines()); // refresh list
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




const fineSlice = createSlice({
    name: "fine",
    initialState: {
        fines: [],
        fineDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllFines.fulfilled, (state, action) => {
                state.loading = false;
                state.fines = action.payload;
            })
            .addCase(fetchAllFines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFineById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFineById.fulfilled, (state, action) => {
                state.loading = false;
                state.fineDetails = action.payload;
            })
            .addCase(fetchFineById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateFine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFine.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateFine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteFine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFine.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteFine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyFines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyFines.fulfilled, (state, action) => {
                state.loading = false;
                state.fines = action.payload;
            })
            .addCase(fetchMyFines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFine.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createFine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default fineSlice.reducer;