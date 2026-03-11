import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contributionService } from "../../services/contributionService";

// Async thunk to create a new contribution.

const initialState = {
    contributions: [],
    loading: false,
    error: null,
}

export const createContribution = createAsyncThunk(
    'contributions/createContribution',
    async (contributionData, thunkAPI) => {
        try {
            const response = await contributionService.createContribution(contributionData);

            thunkAPI.dispatch(fetchContributions());

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchContributions = createAsyncThunk(
    'contributions/fetchContributions',
    async (_, thunkAPI) => {
        try {
            const response = await contributionService.getContributions();

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchContributionById = createAsyncThunk(
    'contributions/fetchContributionById',
    async (id, thunkApi) => {
        try {
            const response = await contributionService.getContributionById(id);

            return response;
        }
        catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


// Edit contribution
export const updateContribution = createAsyncThunk(
    'contributions/updateContributions',
    async ({ id, contributionData }, thunkAPI) => {
        try {
            const response = await contributionService.updateContribution(id, contributionData);

            thunkAPI.dispatch(fetchContributions());

            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// Delete contribution
export const deleteContribution = createAsyncThunk(
    'contributions/deleteContribution',
    async (id, thunkAPI) => {
        try {
            await contributionService.deleteContribution(id);
            return id; // Return the ID of the deleted contribution
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchMyContributions = createAsyncThunk(
    "contributions/fetchMyContributions",
    async (_, thunkAPI) => {
        try {
            return await contributionService.getMyContributions();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const contributionsSlice = createSlice({
    name: 'contributions',
    initialState: {
        contributions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createContribution.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContribution.fulfilled, (state, action) => {
                state.loading = false;
                state.contributions.push(action.payload);
                state.error = null;
            })
            .addCase(createContribution.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchContributions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContributions.fulfilled, (state, action) => {
                state.loading = false;
                state.contributions = action.payload;
                state.error = null;
            })
            .addCase(fetchContributions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchContributionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContributionById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contributions.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.contributions[index] = action.payload; // Update existing contribution
                } else {
                    state.contributions.push
                        (action.payload); // Add new contribution if not found
                }
                state.error = null;
            })
            .addCase(fetchContributionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateContribution.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Update contribution
            // .addCase() - Handles the fulfilled state of the updateContribution async thunk. It updates the existing contribution in the state with the new data returned from the backend.
            // updateContribution - is the async thunk that sends a PUT request to the backend to update a specific contribution by ID. 
            // It takes the contribution ID and the updated contribution data as parameters, and returns the updated contribution data if successful. If the request fails, it throws an error with a message indicating the failure reason.
            // (state, action) => {...} - is the reducer function that updates the state based on the action payload.
            // It finds the index of the contribution being updated in the contributions array and replaces it with the updated contribution data from the action payload. 
            // action.payload - contains the updated contribution data returned from the backend after a successful update operation. 
            // It is used to update the corresponding contribution in the state.
            // state.loading = false; - sets the loading state to false after the update operation is completed, indicating that the update process has finished.
            // const index = state.contributions.findIndex(c => c.id === action.payload.id); - finds the index of the contribution being updated in the contributions array by matching the ID of the contribution with the ID in the action payload.
            // findIndex() - is a JavaScript array method that returns the index of the first element in the array that satisfies the provided testing function. In this case, it checks if the ID of each contribution matches the ID of the updated contribution in the action payload.
            // if (index !== -1) { state.contributions[index] = action.payload; } - checks if the contribution was found in the contributions array (index !== -1) and updates it with the new data from the action payload.
            // If the contribution is not found in the array (index === -1), it means that the contribution being updated is not currently in the state, so it adds the updated contribution to the contributions array using state.contributions.push(action.payload).
            // state.error = null; - clears any existing error messages in the state after a successful update operation.
            .addCase(updateContribution.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contributions.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.contributions[index] = action.payload; // Update existing contribution
                }
                state.error = null;
            })
            .addCase(updateContribution.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteContribution.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //  Delete contribution
            // .addCase() - Handles the fulfilled state of the deleteContribution async thunk. It removes the deleted contribution from the state based on the ID returned from the backend.
            // deleteContribution - is the async thunk that sends a DELETE request to the backend to delete a specific contribution by ID. It takes the contribution ID as a parameter and returns the ID of the deleted contribution if successful. If the request fails, it throws an error with a message indicating the failure reason.
            // (state, action) => {...} - is the reducer function that updates the state based on the action payload. It filters out the deleted contribution from the contributions array using its ID.
            // action.payload - contains the ID of the deleted contribution returned from the backend after a successful delete operation. It is used to filter out the corresponding contribution from the state.
            // state.loading = false; - sets the loading state to false after the delete operation is completed, indicating that the delete process has finished.
            // state.contributions = state.contributions.filter(c => c.id !== action.payload); - filters out the deleted contribution from the contributions array by creating a new array that includes only contributions whose ID does not match the ID of the deleted contribution in the action payload.
            .addCase(deleteContribution.fulfilled, (state, action) => {
                state.loading = false;
                state.contributions = state.contributions.filter(c => c.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteContribution.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyContributions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchMyContributions.fulfilled, (state, action) => {
                state.loading = false;
                state.contributions = action.payload;
                state.error = null;
            })

            .addCase(fetchMyContributions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default contributionsSlice.reducer;
