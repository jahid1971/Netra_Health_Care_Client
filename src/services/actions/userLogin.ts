"use server";

import { authKey, refreshKey } from "./../../constants/authKey";
import { FieldValues } from "react-hook-form";
import { setTokenToCookies } from "./cookies";

export const userLogIn = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const userInfo = await res.json();

    if (userInfo?.data) {
        setTokenToCookies(authKey, userInfo?.data?.accessToken);
        setTokenToCookies(refreshKey, userInfo?.data?.refreshToken, /*http-only:*/ true);
    }

    // if (userInfo?.data?.needPasswordChange) redirect("/dashboard/change-password");

    return userInfo;
};
