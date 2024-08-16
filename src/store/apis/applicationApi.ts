import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { getToken } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APPLICATION_API_END_POINT,
    prepareHeaders: (headers) => {
      headers.set("authorization", getToken());
      return headers;
    },
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    getJobApplicants: builder.query<any, string>({
      query: (id) => ({
        url: `/job-applicants/${id}`,
        //credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.applications.map(({ id }: { id: string }) => ({
                type: "Application",
                id,
              })),
              "Application",
            ]
          : ["Application"],
    }),
    getUserApplications: builder.query<any, void>({
      query: () => ({
        url: `/user-applications`,
        //credentials: "include",
      }),
    }),
    submitApplication: builder.mutation({
      query: (companyDetails) => ({
        url: "/",
        method: "POST",
        body: companyDetails,
        //credentials: "include",
      }),
      invalidatesTags: ["Application"],
    }),
    updateApplicationStatus: builder.mutation({
      query: (application) => ({
        url: `/${application.id}`,
        method: "PATCH",
        body: application,
        //credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Application", id: arg.id },
      ],
    }),
  }),
});

export default applicationApi;

export const {
  useSubmitApplicationMutation,
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
  useGetUserApplicationsQuery,
} = applicationApi;
