import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { jwtDecode } from "jwt-decode";

// This imports the authService which contains the login, register, and getToken functions
// It also import the jwtDecode function to decode the JWT token and extract user information

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;


// If user is stored in localStorage, we decode the token to get the user information and set it in the initial state.
// If not we set user and token to null. We also initialize loading and error states for handling async actions.
// The token is also retrieved from localStorage if it exists, otherwise it is set to null. This allows us to maintain the user's authentication state across page refreshes.
//
const initialState = {
    user: parsedUser?.access_token ? jwtDecode(parsedUser.access_token) : null,
    token: parsedUser ? parsedUser.access_token : null,
    loading: false,
    error: null,
};

// This creates an async thunk for the login action. 
// It takes user credentials as input and calls the login function from authService.
// If the login is successful, it stores the user information in localStorage and returns the response.
// If there is an error during login, it rejects the action with the error message.
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// This creates an async thunk for the register action.
// It takes user data as input and calls the register function from authService.
// If the registration is successful, it returns the response.
// If there is an error during registration, it rejects the action with the error message.
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// This creates the auth slice using createSlice from Redux Toolkit.
// It defines the name of the slice, the initial state, and the reducers for handling actions.
// The extraReducers field is used to handle the pending, fulfilled, and rejected states of the async thunks for login and register.
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                const decodedToken = jwtDecode(action.payload.access_token);
                state.loading = false;
                state.user = jwtDecode(action.payload.access_token);
                state.token = action.payload.access_token;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// This exports the logout action and the reducer for the auth slice. The logout action can be dispatched to clear the user's authentication state and remove the user information from localStorage.
export const { logout } = authSlice.actions;

export default authSlice.reducer;