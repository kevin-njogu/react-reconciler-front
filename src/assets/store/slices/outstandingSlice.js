import { createSlice } from '@reduxjs/toolkit';

export const outstandingSlice = createSlice({
    name: 'outstanding',
    initialState: {
        gateway: 'equity',
    },
    reducers: {
        changeGateway: (state, action) => {
            state.gateway = action.payload;
        },
    },
});

export const { changeGateway } = outstandingSlice.actions;
export default outstandingSlice.reducer;
