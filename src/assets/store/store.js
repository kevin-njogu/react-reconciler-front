import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './slices/paginationSlice';
import outstandingReducer from './slices/outstandingSlice';
import reconDownloadReducer from './slices/reconDownloadSlice';

export default configureStore({
    reducer: {
        pagination: paginationReducer,
        outstanding: outstandingReducer,
        reconciliation: reconDownloadReducer,
    },
});
