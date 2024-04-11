import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userApi } from '../Features/userfeatures/User';
import { adminApi } from '../Features/userfeatures/Admin';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware),
});

setupListeners(store.dispatch);
