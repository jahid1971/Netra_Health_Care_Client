import { authKey, refreshKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { handleUnAuthenticated } from "@/services/actions/cookies";
import { refreshAccessToken } from "@/services/actions/refreshAccessToken";
import Error from "next/error";
import { cookies } from "next/headers";

export async function fetchWithAuth(urlEndpoint, options = {}) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(authKey)?.value;

    const fetchOptions = {
        ...options,
        credentials: "include",
        headers: {
            ...options?.headers,
            authorization: accessToken,
        },
    };

    if (["POST", "PUT", "PATCH"].includes(options?.method)) {
        fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (options?.data) {
        fetchOptions.body = JSON.stringify(options.data);
    }

    try {
        let res = await fetch(`${baseUrl}${urlEndpoint}`, fetchOptions);

        const statusCode = res.status;

        if (statusCode === 401) {
            const newAccessToken = await refreshAccessToken();

            console.log(
                newAccessToken,
                "newAccessToken_______________________________________"
            );

            if (newAccessToken) {
                fetchOptions.headers.Authorization = newAccessToken;

                res = await fetch(`${baseUrl}${urlEndpoint}`, fetchOptions);
            } else {
                handleUnAuthenticated();
                return;
            }
        }

        const data = await res.json();
        data.statusCode = statusCode;

        return data;
    } catch (err: any) {
        console.log(err, "error in fetchWithAuth carech block");
        return {
            error: err,
            message: err?.message || "Fetch error in fetchWithAuth",
        };
    }
}
