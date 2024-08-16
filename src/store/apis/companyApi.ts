import { COMPANY_API_END_POINT } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COMPANY_API_END_POINT,
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getRecruiterCompanies: builder.query<any, void>({
      query: () => ({
        url: "/companies-by-rerecruiter",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.companies.map(({ id }: { id: string }) => ({
                type: "Company",
                id,
              })),
              "Company",
            ]
          : ["Company"],
    }),
    getCompanyById: builder.query<any, string>({
      query: (id) => ({
        url: `/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Company", id }],
    }),
    createCompany: builder.mutation({
      query: (companyDetails) => ({
        url: "/",
        method: "POST",
        body: companyDetails,
        credentials: "include",
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: (companyDetails) => ({
        url: `/${companyDetails.get("id")}`,
        method: "PATCH",
        body: companyDetails,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Company", id: arg.get("id") },
      ],
    }),
  }),
});

export default companyApi;

export const {
  useCreateCompanyMutation,
  useGetRecruiterCompaniesQuery,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} = companyApi;
