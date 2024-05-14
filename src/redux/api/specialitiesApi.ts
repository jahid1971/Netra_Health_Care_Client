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
                url: "/specialty",
                method: "POST",
                contentType: "multipart/form-data",
                data,
            }),
            invalidatesTags: [tagTypes.specialities],
        }),

        getAllSpecialities: queryApiBuilder<ISpecialties[]>(
            build,
            "/specialty",
            [tagTypes.specialities]
        ),

        deleteSpeciality: deleteApiBuilder(build, "/specialty", [
            tagTypes.specialities,
        ]),
    }),
});

export const {
    useCreateSpecialityMutation,
    useGetAllSpecialitiesQuery,
    useDeleteSpecialityMutation,
} = specialitiesApi;
