import { createApiBuilder, deleteApiBuilder, queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const doctorsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: build.mutation({
            query: createApiBuilder("/user/create-doctor"),
            invalidatesTags: [tagTypes.doctor],
        }),

        getDoctors: build.query({
            query: queryApiBuilder("/doctor"),
            providesTags: [tagTypes.doctor],
        }),

        deleteDoctor: build.mutation({
            query: deleteApiBuilder("/doctor/soft"),
            invalidatesTags: (result, error, args) => [{ type: tagTypes.doctor }],
        }),
    }),
});

export const { useCreateDoctorMutation, useGetDoctorsQuery,useDeleteDoctorMutation } = doctorsApi;
