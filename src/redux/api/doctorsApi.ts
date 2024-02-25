import { createApiBuilder, deleteApiBuilder, queryApiBuilder, updateApiBuilder } from "@/utils/apiBuilders";
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

        editDoctor: updateApiBuilder(build, "/doctor", "PATCH", [tagTypes.doctor]),



        deleteDoctor: build.mutation({
            query: deleteApiBuilder("/doctor/soft"),
            invalidatesTags: [tagTypes.doctor],
        }),
    }),
});

export const { useCreateDoctorMutation, useGetDoctorsQuery, useDeleteDoctorMutation, useEditDoctorMutation } =
    doctorsApi;
