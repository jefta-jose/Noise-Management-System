import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9500/api/' }),
    tagTypes: ['user'],

    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (loginData) => ({
                url: 'login/admin',
                method: 'POST',
                body: {
                    Email: loginData.Email,
                    Password: loginData.Password
                }
            }),
            invalidatesTags: ['admin'],
        }),
    }),
});

export const { useAdminLoginMutation } = adminApi;