import { createSlice } from '@reduxjs/toolkit';

const authenticatedUser = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null;

export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: authenticatedUser,
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
