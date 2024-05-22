"use server";
import { authKey } from "@/constants/authKey";
import { USER_ROLE } from "@/constants/role";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export type TUserInfo = {
    email: string;
    role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
    userId: string;
} | null;

export const getUserInfo = (): TUserInfo => {
    const accessToken = cookies().get(authKey)?.value;

    let decodedToken;
    if (accessToken) {
        decodedToken = jwtDecode(accessToken);
        return decodedToken as TUserInfo;
    } else return null 
};
