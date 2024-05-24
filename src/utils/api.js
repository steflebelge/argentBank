import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                // console.log("set du header bearer token");
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            })
        }),
        profile: builder.mutation({
            query: () => ({
                url: '/user/profile',
                method: 'POST',
            })
        }),
    }),
});

export const { useLoginMutation, useProfileMutation } = api;
