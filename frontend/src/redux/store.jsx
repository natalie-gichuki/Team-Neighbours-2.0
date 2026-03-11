import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import contributionsReducer from './Slices/contributionsSlice';
import membersReducer from './Slices/membersSlice';
// This is the redux store configuration file 


const store = configureStore({
    // The reducer is set to authReducer, which handles authentication state.
    reducer: {
        auth: authReducer,
        contributions: contributionsReducer,
        members: membersReducer
    },
    // The devTools option is enabled in development mode to allow for easier debugging of the Redux state.
    devTools: process.env.NODE_ENV !== 'production',

});

export default store;