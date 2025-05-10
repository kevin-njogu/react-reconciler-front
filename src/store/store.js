import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';
import authenticationReducer from './authSlice';

export default configureStore({
    reducer: {
        pagination: paginationReducer,
        authentication: authenticationReducer,
    },
});
