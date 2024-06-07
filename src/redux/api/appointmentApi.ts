import { queryApiBuilder, updateApiBuilder } from "@/utils/apiBuilders";
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
        updateAppointStatus: updateApiBuilder(build, "/appointment", [
            tagTypes.appointment,
        ]),
    }),
});

export const {
    
    useGetDocotorAppointmentsQuery,
    useGetAllAppointmentsQuery,
    useUpdateAppointStatusMutation,
} = appointmentApi;
