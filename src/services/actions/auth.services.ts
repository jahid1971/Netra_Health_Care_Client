"use server";
import { authKey } from "@/constants/authKey";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";






export const getUserInfo = () => {
    const accessToken = cookies().get(authKey)?.value;

    let decodedToken;
    if (accessToken) {
        decodedToken = jwtDecode(accessToken);
        return {
            ...decodedToken,
            role: (decodedToken as any)?.role?.toLowerCase(),
        };
    } else return "";
};






