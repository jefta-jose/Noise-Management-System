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
            invalidatesTags: ['user'], // Invalidate user tags
        }),
        sumOfAllUsers: builder.query({
            query: () => ({
                url: 'numberOfUsers',
            }),
            providesTags: ['admin'], // Provide admin tags
        }),
        sumOfAllReports: builder.query({
            query: () => ({
                url: 'numberOfReports',
            }),
            providesTags: ['admin'], // Provide admin tags
        }),
        reportsPerDay: builder.query({
            query: () => ({
                url: 'numberOfReportsPerDay',
            }),
            providesTags: ['admin'], // Provide admin tags
        }),
        ///////////////mails

        createAdminMail: builder.mutation({
            query: ({ id, UserID, Subject, Email }) => ({
                url: `createEmail/${id}`,
                method: 'POST',
                body: {
                    AdminID: id,
                    UserID,
                    Subject,
                    Email
                }
            }),
            invalidatesTags: ['admin'], // Invalidate admin tags
        }),
        getAllMails: builder.query({
            query: () => ({
                url: 'Emails',
            }),
            providesTags: ['admin'],
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: 'users',
            }),
            providesTags: ['admin'],
        }),

        getAllAdmins: builder.query({
            query: () => ({
                url: 'admins',
            }),
            providesTags: ['admin'],
        }),

        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `admin/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['admin'],
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['admin'],
        }),

        /////////reports
        getAllReports: builder.query({
            query: () => ({
                url: 'reports',
            }),
            providesTags: ['admin'],
        })
    }),
});

export const { useDeleteUserMutation, useDeleteAdminMutation, useGetAllAdminsQuery, useGetAllReportsQuery, useGetAllUsersQuery, useGetAllMailsQuery, useCreateAdminMailMutation, useReportsPerDayQuery, useSumOfAllReportsQuery, useSumOfAllUsersQuery, useAdminLoginMutation } = adminApi;
