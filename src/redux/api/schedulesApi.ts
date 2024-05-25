import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

import { TSchedule } from "@/types/schedules";

const schedulesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createSchedule: createApiBuilder(build, "/schedule", [
            tagTypes.schedule,
        ]),

        getSchedules: queryApiBuilder<TSchedule[]>(build, "/schedule", [
            tagTypes.schedule,
        ]),

        deleteSchedule: updateApiBuilder(
            build,
            "/schedule",
            [tagTypes.schedule],
            { method: "delete" }
        ),
        // deleteSchedule: deleteApiBuilder(build, "/schedule", [
        //     tagTypes.schedule,
        // ]),
    }),
});

export const {
    useCreateScheduleMutation,
    useGetSchedulesQuery,
    useDeleteScheduleMutation,
} = schedulesApi;
