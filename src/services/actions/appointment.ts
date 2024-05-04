"use server";

import { baseUrl } from "@/constants/commmon";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
// import { fetchWithAuth } from "./cookies";

export const createAppointment = async (data) => {
    const res = await fetchWithAuth(`${baseUrl}/appointment`, {
        method: "POST",
        data: data,
    });



    return res;
};
