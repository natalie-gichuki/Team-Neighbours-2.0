import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loanService } from "../../services/loanService";

// Async thunk to fetch all loans for the current member
export const fetchAllLoans = createAsyncThunk(
    "loan/fetchAllLoans",
    async (_, thunkAPI) => {
        try {
            const response = await loanService.getAllLoans();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch a specific loan by ID (admin only)
export const fetchLoanById = createAsyncThunk(
    "loan/fetchLoanById",
    async (id, thunkAPI) => {
        try {
            const response = await loanService.getLoanById(id);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to update a specific loan by ID (admin only)
export const updateLoan = createAsyncThunk(
    "loan/updateLoan",
    async ({ id, loandata }, thunkAPI) => {
        try {
            const response = await loanService.updateLoan(id, loandata);
            thunkAPI.dispatch(fetchAllLoans()); // Refresh fines list after update
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to delete a specific loan by ID (admin only)
export const deleteLoan = createAsyncThunk(
    "loan/deleteLoan",
    async (id, thunkAPI) => {
        try {
            const response = await loanService.deleteLoan(id);
            thunkAPI.dispatch(fetchAllLoans()); // Refresh fines list after deletion
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch all loans for a member
export const fetchMyLoans = createAsyncThunk(
    "loans/fetchMyLoans",
    async (_, thunkAPI) => {
        try {
            return await loanService.getMemberLoans();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Create loan (admin)
export const createLoan = createAsyncThunk(
    "loan/createLoan",
    async (loanData, thunkAPI) => {
        try {
            const response = await loanService.createLoan(loanData);
            thunkAPI.dispatch(fetchAllLoans()); // refresh list
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);




const loanSlice = createSlice({
    name: "loan",
    initialState: {
        loans: [],
        loanDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLoans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLoans.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchAllLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchLoanById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLoanById.fulfilled, (state, action) => {
                state.loading = false;
                state.loanDetails = action.payload;
            })
            .addCase(fetchLoanById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLoan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLoan.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateLoan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteLoan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLoan.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteLoan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyLoans.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyLoans.fulfilled, (state, action) => {
                state.loading = false;
                state.loans = action.payload;
            })
            .addCase(fetchMyLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createLoan.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLoan.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createLoan.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default loanSlice.reducer;