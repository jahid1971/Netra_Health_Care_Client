"use server";

import { authKey, refreshKey } from "@/constants/authKey";
import { handleUnAuthenticated } from "./cookies";
import { cookies } from "next/headers";
import { baseUrl } from "@/constants/commmon";

export async function refreshAccessToken() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get(refreshKey)?.value;

    if (!refreshToken) {
        handleUnAuthenticated();
        return null;
    }

    try {
        const refreshResponse = await fetch(`${baseUrl}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Cookie: `refreshToken=${refreshToken}`,
            },
        });

        const { data } = (await refreshResponse.json()) || {};

        if (data?.accessToken) {
            cookieStore.set(authKey, data.accessToken);

            return data.accessToken;
        }

        handleUnAuthenticated();

        return null;
    } catch (error) {
        console.log(
            error,
            "Error refreshing access token........................"
        );

        handleUnAuthenticated();
        return null;
    }
}
