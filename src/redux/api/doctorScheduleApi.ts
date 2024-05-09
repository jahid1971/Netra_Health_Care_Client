import { TResponseRedux } from "./../../types/common";
import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { ISchedule } from "@/types/schedules";

const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createDoctorSchedule: createApiBuilder(build, "/doctor-schedule", [
            tagTypes.doctorSchedule,
            // tagTypes.schedule,
        ]),

        getDoctorSchedules: queryApiBuilder<ISchedule[]>(
            build,
            "/doctor-schedule",
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
    useDeleteDoctorScheduleMutation,
} = doctorScheduleApi;
