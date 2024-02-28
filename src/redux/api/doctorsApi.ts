import { createApiBuilder, deleteApiBuilder, queryApiBuilder, updateApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const doctorsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor:createApiBuilder( build, "/user/create-doctor", [tagTypes.doctor]),
 
        getDoctors: build.query({
            query: queryApiBuilder("/doctor"),
            providesTags: [tagTypes.doctor],
        }),

        editDoctor: updateApiBuilder(build, "/doctor",  [tagTypes.doctor]),



        deleteDoctor: build.mutation({
            query: deleteApiBuilder("/doctor/soft"),
            invalidatesTags: [tagTypes.doctor],
        }),
    }),
});

export const { useCreateDoctorMutation, useGetDoctorsQuery, useDeleteDoctorMutation, useEditDoctorMutation } =
    doctorsApi;
