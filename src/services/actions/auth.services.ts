import { authKey } from "@/constants/authKey";
import { instance } from "@/helpers/axios/axiosInstance";
import { getFromLocalStorage, removeFromLocalStorage, setTolocalStorage } from "@/utils/localStorage";
import { jwtDecode } from "jwt-decode";

export const storeUserInfo = (accessToken: string) => setTolocalStorage(authKey, accessToken);

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);

    let decodedToken;
    if (authToken) {
        decodedToken = jwtDecode(authToken);
        return {
            ...decodedToken,
            role: (decodedToken as any)?.role?.toLowerCase(),
        };
    } else return "";
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) return !!authToken;
};

export const getNewAccessToken = async () => {
    return await instance({
        url: "http://localhost:5000/api/v1/auth/refresh-token",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};
