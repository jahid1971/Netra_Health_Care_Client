import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { ISpecialties } from "@/types/Doctors";

const specialitiesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSpeciality: build.mutation({
            query: (data: any) => ({
                url: "/specialties",
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [tagTypes.specialities],
        }),

        getAllSpecialities: queryApiBuilder<ISpecialties[]>(
            build,
            "/specialties",
            [tagTypes.specialities]
        ),

        deleteSpeciality: deleteApiBuilder(build, "/specialties", [
            tagTypes.specialities,
        ]),
    }),
});

export const {
    useCreateSpecialityMutation,
    useGetAllSpecialitiesQuery,
    useDeleteSpecialityMutation,
} = specialitiesApi;
