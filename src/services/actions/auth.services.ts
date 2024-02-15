import { authKey } from "@/constants/authKey";
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
            role: decodedToken?.role?.toLowerCase(),
        };
    } else return "";
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) return !!authToken;
};

// export const removeUser = () => removeFromLocalStorage(authKey);
