import { createSlice } from '@reduxjs/toolkit';

export const gleetsSlice = createSlice({
    name: 'Gleets',
    initialState: {
        gleets: [],
    },
    reducers: {
        setGleets: (state, action) => {
            state.gleets = action.payload;
        },
    },
});

export const { setGleets } = gleetsSlice.actions;

export default gleetsSlice.reducer;
