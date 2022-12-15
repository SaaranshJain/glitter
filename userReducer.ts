import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        name: null,
        email: null,
        photoUrl: null,
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
        },
        logout: (state) => {
            state.name = null;
            state.email = null;
            state.photoUrl = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
