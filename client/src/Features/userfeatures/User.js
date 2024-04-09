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
            invalidatesTags: ['user'],
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
            invalidatesTags: ['user'],
        }),
        getAllUsers: builder.query({
            query: () => 'users',
            providesTags: ['user'],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `user/${id}`,
            }),
            providesTags: ['user'],
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
            invalidatesTags: ['user'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['user'],
        }),

        //////////////////////////// - NOTIFICATIONS API
        getNotifications: builder.query({
            query: () => 'notifications',
            providesTags: ['user'],
        }),

        /////////////////////////////////// feedback api
        getFeedback: builder.query({
            query: (id) => `feedback/${id}`,
            providesTags: ['user'],
        }),
        //////////////////////////////////// mails api
        createMail: builder.mutation({
            query: ({ id, AdminID, Subject, Email }) => ({
                url: `createEmailToAdmin/${id}`,
                method: 'POST',
                body: {
                    UserID: id,
                    AdminID,
                    Subject,
                    Email
                }
            }),
            invalidatesTags: ['user'],
        }),


        getUserEmails: builder.query({
            query: (id) => ({
                url: `Email/${id}`,
            }),
            providesTags: ['user'],
        }),
        deleteEmail: builder.mutation({
            query: (id) => ({
                url: `deleteEmail/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['user'],
        }),

        ////////////////////////////////// reports
        reportIncident: builder.mutation({
            query: ({ id, Location, Type, Description, NoiseLevel, SourceOfNoise, DurationOfNoise, SupportingDocuments }) => ({
                url: `createreport/${id}`,
                method: 'POST',
                body: {
                    UserID: id,
                    Location,
                    Type,
                    Description,
                    NoiseLevel,
                    SourceOfNoise,
                    DurationOfNoise,
                    SupportingDocuments
                },
            }),
        }),
    }),
});

export const {
    useReportIncidentMutation,
    useCreateMailMutation,
    useGetUserEmailsQuery,
    useDeleteEmailMutation,
    useGetFeedbackQuery,
    useGetNotificationsQuery,
    useGetAllUsersQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useGetUserByIdQuery,
    useUpdateUserDetailsMutation,
    useDeleteUserMutation
} = userApi;
