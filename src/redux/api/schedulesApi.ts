import { createApiBuilder, deleteApiBuilder, queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const schedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSchedule: createApiBuilder(build, "/schedule", [tagTypes.schedule]),

        // getSchedules: build.query({
        //     query: queryApiBuilder("/schedule"),
        //     providesTags: [tagTypes.schedule],
        // }),
        getSchedules: queryApiBuilder(build, "/schedule", [tagTypes.schedule]),

       
    }),
});

export const { useCreateScheduleMutation, useGetSchedulesQuery } = schedulesApi;
