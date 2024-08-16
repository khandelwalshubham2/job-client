import { USER_API_END_POINT } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API_END_POINT,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginDetails) => ({
        url: "/login",
        method: "POST",
        body: loginDetails,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (signupDetails) => ({
        url: "/signup",
        method: "POST",
        body: signupDetails,
      }),
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (updateDetails) => ({
        url: "/update-me",
        method: "PATCH",
        body: updateDetails,
        credentials: "include",
      }),
    }),
  }),
});

export default authApi;

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useUpdateUserMutation,
} = authApi;
