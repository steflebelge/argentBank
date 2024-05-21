import { configureStore } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
