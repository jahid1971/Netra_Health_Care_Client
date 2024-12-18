import {
    createApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TAppointment } from "@/types/Appointment";

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // getMyAppointment: queryApiBuilder<TAppointment[]>(
        //     build,
        //     "/appointment/my-appointments",
        //     [tagTypes.appointment]
        // ),

        getDocotorAppointments: queryApiBuilder<TAppointment[]>(
            build,
            "/appointment/doctor-appointments",
            [tagTypes.appointment]
        ),

        getAllAppointments: queryApiBuilder<TAppointment[]>(
            build,
            "/appointment",
            [tagTypes.appointment]
        ),

        getCurrentAppointment: singleQueryApiBuilder<TAppointment>(
            build,
            "/appointment/current",
            [tagTypes.appointment]
        ),

        updateAppointStatus: updateApiBuilder(build, "/appointment", [
            tagTypes.appointment,
        ]),

        createRating: createApiBuilder(build, "/appointment/review", [
            tagTypes.review,
            tagTypes.doctor,
        ]),
    }),
});

export const {
    useGetDocotorAppointmentsQuery,
    useGetAllAppointmentsQuery,
    useGetCurrentAppointmentQuery,
    useUpdateAppointStatusMutation,
    useCreateRatingMutation,
} = appointmentApi;
