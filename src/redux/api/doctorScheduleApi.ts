import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
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

        deleteDoctorSchedule: updateApiBuilder(
            build,
            "/doctor-schedule",
            [tagTypes.doctorSchedule],
            { method: "delete" }
        ),
    }),
});
export const {
    useCreateDoctorScheduleMutation,
    useGetDoctorSchedulesQuery,
    useGetMySchedulesQuery,
    useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
