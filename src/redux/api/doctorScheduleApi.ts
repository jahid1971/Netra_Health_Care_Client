import { createApiBuilder, queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: createApiBuilder(build, "/doctor-schedule", [
            tagTypes.doctorSchedule,
            tagTypes.schedule,
        ]),

        getDoctorSchedules: queryApiBuilder(build, "/doctor-schedule", [tagTypes.doctorSchedule]),


    }),
});
export const { useCreateDoctorScheduleMutation,useGetDoctorSchedulesQuery } = doctorScheduleApi;
