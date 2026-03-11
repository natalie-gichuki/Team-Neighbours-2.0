import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { memberService } from "../../services/memberService";

// Async thunk to fetch all members (admin only)
export const FetchAllMembers = createAsyncThunk(
    "members/fetchAllMembers",
    async (_, thunkAPI) => {
        try {
            const response = await memberService.getMembers();
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);

        }
    }
);

// Async thunk to fetch all disabled members (admin only)
export const fetchDisabledMembers = createAsyncThunk(
    "members/fetchDisabledMembers",
    async (_, thunkAPI) => {
        try {
            const response = await memberService.getDisabledMembers();
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to enable a member (admin only)
export const enableMember = createAsyncThunk(
    "members/enableMember",
    async (id, thunkAPI) => {
        try {
            const response = await memberService.enableMember(id);
            thunkAPI.dispatch(fetchDisabledMembers()); // Refresh disabled members list after enabling
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to disable a member (admin only)
export const disableMember = createAsyncThunk(
    "members/disableMember",
    async (id, thunkAPI) => {
        try {
            const response = await memberService.disableMember(id);
            thunkAPI.dispatch(fetchDisabledMembers()); // Refresh disabled members list after disabling
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to update member details 
export const updateMemberDetails = createAsyncThunk(
    "members/updateMemberDetails",
    async ({ id, memberData }, thunkAPI) => {
        try {
            const response = await memberService.updateMember(id, memberData);

            thunkAPI.dispatch(fetchMemberById(id)); // Refresh member details after update
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to fetch a specific member by ID 
export const fetchMemberById = createAsyncThunk(
    "members/fetchMemberById",
    async (id, thunkAPI) => {
        try {
            const response = await memberService.getMemberById(id);
            return response;
        }

        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const membersSlice = createSlice({
    name: "members",
    initialState: {
        members: [],
        disabledMembers: [],
        selectedMember: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchAllMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchAllMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(FetchAllMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchDisabledMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDisabledMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.disabledMembers = action.payload;
            })
            .addCase(fetchDisabledMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(enableMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enableMember.fulfilled, (state, action) => {
                state.loading = false;

                const enabledId = action.meta.arg;

                const member = state.disabledMembers.find(m => m.id === enabledId);

                if (member) {
                    member.role = "member";

                    state.disabledMembers = state.disabledMembers.filter(m => m.id !== enabledId);

                    state.members.push(member);
                }
            })
            .addCase(enableMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(disableMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(disableMember.fulfilled, (state, action) => {
                state.loading = false;

                const disabledId = action.meta.arg;

                const member = state.members.find(m => m.id === disabledId);

                if (member) {
                    member.role = "disabled";

                    state.members = state.members.filter(m => m.id !== disabledId);

                    state.disabledMembers.push(member);
                }
            })
            .addCase(disableMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMemberDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMemberDetails.fulfilled, (state, action) => {
                state.loading = false;
                // Optionally update members list here
            })
            .addCase(updateMemberDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMemberById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMemberById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMember = action.payload;
            })
            .addCase(fetchMemberById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default membersSlice.reducer;
