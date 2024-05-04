// import { authKey, refreshKey } from "@/constants/authKey";
// import { baseUrl } from "@/constants/commmon";
// import { handleUnAuthenticated } from "@/services/actions/cookies";
// import { cookies } from "next/headers";

// export async function fetchWithAuth(url, options = {}) {
//     const cookieStore = cookies();
//     const accessToken = cookieStore.get(authKey)?.value;

//     const fetchOptions = {
//         ...options,
//         headers: {
//             ...options?.headers,
//             Authorization: accessToken,
//         },
//     };

//     if (["POST", "PUT", "PATCH"].includes(options?.method)) {
//         fetchOptions.headers["Content-Type"] = "application/json";
//     }

//     if (options?.data) {
//         fetchOptions.body = JSON.stringify(options.data);
//     }
//     let res;
//     res = await fetch(url, fetchOptions);

//     // const statusCode = res?.status;
//     const statusCode = 401;

//     if (statusCode === 401) {
//         const refreshToken = cookies().get(refreshKey)?.value;

//         try {
//             const refreshResponse = await fetch(
//                 `${baseUrl}/auth/refresh-token`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-type": "application/json",
//                         Cookie: `refreshToken=${refreshToken}`,
//                     },
//                 }
//             );
//             const { data } = await refreshResponse.json();

//             const accessToken = data?.accessToken;
//             console.log(
//                 accessToken,
//                 "Access  token is fetched ..................."
//             );

//             if (accessToken) {
//                 cookies().set(authKey, accessToken);

//                 fetchOptions.headers.Authorization = accessToken;

//                 res = await fetch(url, fetchOptions);
//             } else {
//                 handleUnAuthenticated();
//                 return;
//             }
//         } catch (error) {
//             console.log(error, "error in refreshToken catch block");
//             handleUnAuthenticated();
//             return;
//         }
//     }

//     const data = await res.json();

//     data.statusCode = statusCode;

//     return data;
// }

import { authKey, refreshKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { handleUnAuthenticated } from "@/services/actions/cookies";
import { cookies } from "next/headers";

export async function fetchWithAuth(url, options = {}) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(authKey)?.value;

    const fetchOptions = {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: accessToken,
        },
    };

    if (["POST", "PUT", "PATCH"].includes(options?.method)) {
        fetchOptions.headers["Content-Type"] = "application/json";
    }

    if (options?.data) {
        fetchOptions.body = JSON.stringify(options.data);
    }

    let res = await fetch(url, fetchOptions);

    const statusCode = res.status;

    if (statusCode === 401) {
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
            cookies().set(authKey, newAccessToken);

            fetchOptions.headers.Authorization = newAccessToken;

            res = await fetch(url, fetchOptions);
        } else {
            handleUnAuthenticated();
            return;
        }
    }

    const data = await res.json();
    data.statusCode = statusCode;

    return data;
}

// access token is refetching if the status code is 401

async function refreshAccessToken() {
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
        
        return data?.accessToken;
    } catch (error) {
        console.log(error, "Error refreshing access token");
        handleUnAuthenticated();
        return null;
    }
}
