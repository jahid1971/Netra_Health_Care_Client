"use server";

import { fetchWithAuth } from "@/utils/fetchWithAuth";

export const initialPayment = async (id:string) => {
    const res = await fetchWithAuth(`/payment/init/${id}`, {
        method: "POST",
    });

    return res;
};
