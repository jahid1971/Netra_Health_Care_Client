"use server";

import { baseUrl } from "@/constants/commmon";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const initialPayment = async (id) => {
    const res = await fetchWithAuth(`${baseUrl}/payment/init/${id}`, {
        method: "POST",
    });

    return res;
};
