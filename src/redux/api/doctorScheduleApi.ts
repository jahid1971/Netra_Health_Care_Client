import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { ISchedule, TDoctorSchedule } from "@/types/schedules";

const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: createApiBuilder(build, "/doctor-schedule", [
            tagTypes.doctorSchedule,
            tagTypes.schedule,
        ]),

        getDoctorSchedules: queryApiBuilder<TDoctorSchedule[]>(
            build,
            "/doctor-schedule",
            [tagTypes.doctorSchedule]
        ),

        getMySchedules: queryApiBuilder<TDoctorSchedule[]>(
            build,
            "/doctor-schedule/my-schedules",
            [tagTypes.doctorSchedule]
        ),

        deleteDoctorSchedule: deleteApiBuilder(build, "/doctor-schedule", [
            tagTypes.doctorSchedule,
        ]),
    }),
});
export const {
    useCreateDoctorScheduleMutation,
    useGetDoctorSchedulesQuery,
    useGetMySchedulesQuery,
    useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
