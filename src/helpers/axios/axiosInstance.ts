import { authKey, refreshKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { deleteCookies, setTokenToCookies } from "@/services/actions/cookies";
import { IMeta, TResponse } from "@/types/common";

import axios, { AxiosResponse } from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

type TAxiosResponse<T> = AxiosResponse<T> & TResponse<T>;

instance.interceptors.request.use(
    function (config) {
        const accessToken = getCookie(authKey);

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        console.log(error, "error in axios instance request");
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response): TAxiosResponse<any> {
        console.log(response?.data, "response in axios instance");

        return response;
    },

    async function (error) {
        console.log(error?.response?.data, "error in axios instance response");
        const originalRequest = error.config;

        //to prevent infinite loop by getNewAccessToken()
        if (originalRequest.url === `${baseUrl}/auth/refresh-token`) {
            return Promise.reject(error);
        }

        //  ._retry is to prevent infinite loop
        if (error?.response?.status === 401 && !originalRequest._retry) {
            console.log("refresh req sentttttttttttttttttttttttttttt");

            originalRequest._retry = true;
            try {
                const response = await getNewAccessToken();

                if (response?.status === 200) {
                    try {
                        const res = await instance(originalRequest);

                        const resObject = {
                            data: res?.data,
                            meta: res?.data?.meta,
                        };

                        return resObject;
                    } catch (retryError) {
                        console.log("retryError", retryError);

                        return Promise.reject(retryError);
                    }
                } else {
                    deleteCookies([authKey, refreshKey]);
                }
            } catch (refreshError) {
                console.log(
                    refreshError,
                    "Token refresh failed in refresh catch block"
                );
                deleteCookies([authKey, refreshKey]);

                return Promise.reject(refreshError);
            }
        }

        console.warn(
            error,
            " outside 401 handling, returning original error !"
        );

        return Promise.reject(error);
    }
);

export { instance };

const getNewAccessToken = async () => {
    return await instance({
        url: `${baseUrl}/auth/refresh-token`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    });
};

function getCookie(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
