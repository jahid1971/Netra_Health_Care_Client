import { queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { TAppointment } from "@/types/Appointment";

const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyAppointment: queryApiBuilder<TAppointment[]>(
            build,
            "/appointment/my-appointments",
            [tagTypes.appointment]
        ),

        getDocotorAppointments: queryApiBuilder<TAppointment[]>(
            build,
            "/appointment/doctor-appointments",
            [tagTypes.appointment]
        ),
    }),
});

export const { useGetMyAppointmentQuery,useGetDocotorAppointmentsQuery } = appointmentApi;
