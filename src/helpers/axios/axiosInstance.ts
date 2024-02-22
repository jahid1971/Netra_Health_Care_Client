import { authKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { useAppDispatch } from "@/redux/hooks";
import { logOutUser } from "@/services/actions/logOutuser";
import { IGenericErrorResponse, TResponeSuccess } from "@/types/common";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        console.log(response?.data, "response in axios instance");

        const responseObject: TResponeSuccess = {
            data: response?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    async function (error) {

        const originalRequest = error.config;
        // ._retry is to prevent infinite loop
        if (error?.response?.status === 500 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await getNewAccessToken();
                const accessToken = response?.data?.data?.accessToken;
                if (accessToken) {
                    originalRequest.headers["Authorization"] = accessToken;
                    localStorage.setItem(authKey, accessToken);
                    //  setAccessToken(accessToken);
                    return instance(originalRequest);
                } else {
                    localStorage.removeItem(authKey);
                    window.location.href = "/";
                }
            } catch (refreshError) {
                console.log(refreshError, "Token refresh failed");
                localStorage.removeItem(authKey);
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const getNewAccessToken = async () => {
    return await instance({
        url: `${baseUrl}/auth/refresh-token`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};

export { instance };
