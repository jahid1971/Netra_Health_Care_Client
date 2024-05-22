import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { IDoctor } from "@/types/Doctors";

const doctorsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctor: createApiBuilder(build, "/user/create-doctor", [
            tagTypes.doctor,
        ]),

        getDoctors: queryApiBuilder<IDoctor[]>(build, "/doctor", [
            tagTypes.doctor,
        ]),

        editDoctor: updateApiBuilder(
            build,
            "/doctor",
            [tagTypes.doctor, tagTypes.user],
            { contentType: "multipart/form-data" }
        ),

        getSingleDoctor: singleQueryApiBuilder<IDoctor>(build, "/doctor", [
            tagTypes.doctor,
        ]),

        deleteDoctor: deleteApiBuilder(build, "/doctor/soft", [
            tagTypes.doctor,
        ]),
    }),
});

export const {
    useCreateDoctorMutation,
    useGetDoctorsQuery,
    useDeleteDoctorMutation,
    useEditDoctorMutation,
    useGetSingleDoctorQuery,
} = doctorsApi;
