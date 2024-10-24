import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// إنشاء API Slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }), // الأساس للـ API
  endpoints: (builder) => ({
    // استعلام التسجيل (Mutation)
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData,
      }),
    }),
  }),
});

// تصدير ال Mutation لاستخدامه في المكونات
export const { useRegisterUserMutation } = apiSlice;
