"use server";

import { baseUrl } from "@/constants/commmon";
import { authKey, refreshKey } from "@/constants/authKey";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

export const deleteCookies = async (keys: string[]) => {
    keys.forEach((key) => {
        cookies().delete(key);
    });
};

export async function setTokenToCookies(
    key: string,
    token: string,
    httpOnly: boolean = false
) {
    const options: {
        httpOnly?: boolean;
        secure?: boolean;
        //   sameSite?: 'strict' | 'lax' | 'none';
        path: string;
    } = {};

    if (httpOnly) {
        options.httpOnly = true;
        options.secure = process.env.NODE_ENV === "production";
        options.path = "/";
    }

    cookies().set(key, token, options);
}

export async function getCookies  (key: string)  {
    return cookies().get(key)?.value;
};

export async function handleUnAuthenticated() {
    deleteCookies([authKey, refreshKey]);

    redirect("/login");
}

export async function refreshTokenGen() {
    const accessToken = cookies().get(authKey)?.value;
    let decodedData = null;
    if (accessToken) {
        decodedData = (await jwtDecode(accessToken)) as any;
        const now = Date.now() / 1000;
        const buffer = 60;
        const isExpired = decodedData.exp - now <= buffer;
        // const isExpired = true;
        if (isExpired) {
            const refreshToken = cookies().get(refreshKey)?.value;

            try {
                const res = await fetch(`${baseUrl}/auth/refresh-token`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        Cookie: `refreshToken=${refreshToken}`,
                    },
                });
                const { data } = await res.json();

                console.log(
                    data?.accessToken,
                    "Access  token is fetched ..................."
                );

                if (data?.accessToken) {
                    return cookies().set(authKey, data?.accessToken);
                } else {
                    return deleteCookies([authKey, refreshKey]);
                }
            } catch (error) {
                console.log(error, "error in refreshTokenGen catch block");
                deleteCookies([authKey, refreshKey]);

                throw error;
            }
        }
    }
}

export async function fetchWithAuth(url, options = {}) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(authKey)?.value;

    //     let res = await fetch(url, {
    //         ...options,
    //         headers: {
    //             ...options.headers,
    //             options.method==="POST" ||"PUT"||"PATCH" && "Content-Type": "application/json",
    //             Authorization: accessToken,
    //         },
    //         options.data && body: JSON.stringify(options.data),
    //     });

    const fetchOptions = {
        ...options,
        headers: {
            ...options.headers,
            Authorization: accessToken,
        },
    };

    if (["POST", "PUT", "PATCH"].includes(options?.method)) {
        fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (options?.data) {
        fetchOptions.body = JSON.stringify(options.data);
    }

    const res = await fetch(url, fetchOptions);

    // if (res.status === 401) {
    //     // Send request to refresh the accessToken
    //     const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include", // Thhis will send the refresh token in the cookie
    //     });

    //     if (refreshRes.ok) {
    //         const { accessToken: newAccessToken } = await refreshRes.json();

    //         setTokenToCookies(authKey, newAccessToken);

    //         // Retry the original request with the new accessToken
    //         res = await fetch(url, {
    //             ...options,
    //             headers: {
    //                 ...options.headers,
    //                 Authorization: newAccessToken,
    //             },
    //         });
    //     } else {
    //         deleteCookies([authKey, refreshKey]);
    //         throw new Error("Failed to refresh token");
    //     }
    // }

    const data = await res?.json();
    return data;
}
