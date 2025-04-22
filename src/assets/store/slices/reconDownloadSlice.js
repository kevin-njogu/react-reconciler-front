import { createSlice } from '@reduxjs/toolkit';

export const reconDownloadSlice = createSlice({
    name: 'reconciliation',
    initialState: {
        gateway: 'equity',
        startdate: null,
        enddate: null,
    },
    reducers: {
        changeGateway: (state, action) => {
            state.gateway = action.payload.gateway;
            state.startdate = action.payload.startdate;
            state.enddate = action.payload.enddate;
        },
    },
});

export const { changeGateway } = reconDownloadSlice.actions;
export default reconDownloadSlice.reducer;
