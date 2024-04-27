import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const doctorsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: createApiBuilder(build, "/user/create-doctor", [tagTypes.doctor]),

        getDoctors: queryApiBuilder(build, "/doctor", [tagTypes.doctor]),

        editDoctor: updateApiBuilder(build, "/doctor", [tagTypes.doctor,tagTypes.user]),

        getSingleDoctor: singleQueryApiBuilder(build, "/doctor", [tagTypes.doctor]),

        deleteDoctor: build.mutation({
            query: deleteApiBuilder("/doctor/soft"),
            invalidatesTags: [tagTypes.doctor],
        }),
    }),
});

export const {
    useCreateDoctorMutation,
    useGetDoctorsQuery,
    useDeleteDoctorMutation,
    useEditDoctorMutation,
    useGetSingleDoctorQuery,
} = doctorsApi;
