import { createApiBuilder, deleteApiBuilder, queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const schedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSchedule: createApiBuilder(build, "/schedule", [tagTypes.schedule]),

        getSchedules: queryApiBuilder(build, "/schedule", [tagTypes.schedule]),

        deleteSchedule: deleteApiBuilder(build, "/schedule", [tagTypes.schedule]),
    }),
});

export const { useCreateScheduleMutation, useGetSchedulesQuery, useDeleteScheduleMutation } = schedulesApi;
