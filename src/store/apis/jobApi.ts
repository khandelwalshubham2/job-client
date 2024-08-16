import { JOB_API_END_POINT } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: JOB_API_END_POINT,
  }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getRecruiterJobs: builder.query<any, void>({
      query: () => ({
        url: "/jobs-by-recruiter",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.jobs.map(({ id }: { id: string }) => ({
                type: "Job",
                id,
              })),
              "Job",
            ]
          : ["Job"],
    }),
    getJobById: builder.query<any, string>({
      query: (id) => ({
        url: `/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),
    createJob: builder.mutation({
      query: (jobDetails) => ({
        url: "/",
        method: "POST",
        body: jobDetails,
        credentials: "include",
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...jobDetails }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: jobDetails,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Job", id: arg.id }],
    }),
    getAllJobs: builder.query<any, string>({
      query: (url) => ({
        url: `/${url}`,
        credentials: "include",
      }),
    }),
  }),
});

export default jobApi;

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetJobByIdQuery,
  useGetRecruiterJobsQuery,
  useGetAllJobsQuery,
} = jobApi;
