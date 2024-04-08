import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9500/api/' }),
    tagTypes: ['user'],

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: 'register/user',
                method: 'POST',
                body: userData
            }),
            invalidateTags: ['user'],
        }),
        login: builder.mutation({
            query: (loginData) => ({
                url: 'login/user',
                method: 'POST',
                body: {
                    Email: loginData.Email,
                    Password: loginData.Password
                }
            }),
            invalidateTags: ['user'],
        }),
        getAllUsers: builder.query({
            query: () => 'users',
            providesTags: ['user'],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `user/${id}`,
            }),
            provideTags: ['user'],
        }),
        updateUserDetails: builder.mutation({
            query: (id, updateDetails) => ({
                url: `user/update/${id}`,
                method: 'PUT',
                body: {
                    Email: updateDetails.Email,
                    Password: updateDetails.Password,
                    County: updateDetails.County,
                    Residence: updateDetails.Residence,
                    PhoneNumber: updateDetails.PhoneNumber,
                    Occupation: updateDetails.Occupation,
                    PhotoURL: updateDetails.PhotoURL
                }
            }),
            invalidateTags: ['user'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/delete/${id}`,
                method: 'DELETE'
            }),
            invalidateTags: ['user'],
        }),

        //////////////////////////// - NOTIFICATIONS API
        getNotifications: builder.query({
            query: ()=>'notifications',
            providesTags: ['user'],
        }),

        /////////////////////////////////// feedback api
        getFeedback: builder.query({
            query: (id) => `feedback/${id}`,
            providesTags: ['user'],
        }),        
    }),
});

export const { useGetFeedbackQuery , useGetNotificationsQuery ,useGetAllUsersQuery, useRegisterUser, useLoginMutation, useGetUserByIdQuery, useupdateUserDetailsMutation, useDeleteUserMutation } = userApi;