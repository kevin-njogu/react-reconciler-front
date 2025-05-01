import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import outstandingReducer from './slices/outstandingSlice';
import authenticationReducer from './slices/authSlice';

export default configureStore({
    reducer: {
        pagination: paginationReducer,
        outstanding: outstandingReducer,
        authentication: authenticationReducer,
    },
});
