import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 0,
    },
    reducers: {
        next: (state) => {
            state.page += 1;
        },
        previous: (state) => {
            state.page -= 1;
        },
    },
});

export const { next, previous } = paginationSlice.actions;
export default paginationSlice.reducer;
