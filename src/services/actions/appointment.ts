"use server";

import { baseUrl } from "@/constants/commmon";
import { TAppointment } from "@/types/Appointment";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const createAppointment = async (data: Partial<TAppointment>) => {
    const res = await fetchWithAuth(`/appointment`, {
        method: "POST",
        data: data,
    });

    return res;
};
