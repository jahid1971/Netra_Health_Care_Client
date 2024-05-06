import { authKey, refreshKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { deleteCookies, setTokenToCookies } from "@/services/actions/cookies";

import axios, { AxiosResponse } from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

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
    function (response): AxiosResponse<any, any> {
        console.log(response?.data, "response in axios instance");

        const responseObject: any = {
            data: response?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },

    async function (error) {
        console.log(error, "error in axios instance response");
        const originalRequest = error.config;
        //  ._retry is to prevent infinite loop
        if (error?.response?.status === 401 && !originalRequest._retry) {
            console.log("refresh req sentttttttttttttttttttttttttttt");
            originalRequest._retry = true;
            try {
                const response = await getNewAccessToken();
                const accessToken = response?.data?.data?.accessToken;
                if (accessToken) {
                    originalRequest.headers["Authorization"] = accessToken;

                    await setTokenToCookies(authKey, accessToken);

                    console.log("original request reSent in axios instance");

                    const res = await instance(originalRequest);

                    const resObject: any = {
                        data: res?.data,
                        meta: res?.data?.meta,
                    };

                    console.log(
                        resObject,
                        "resobject after original request reSent in axios instance"
                    );
                    return resObject;
                } else {
                    deleteCookies([authKey, refreshKey]);
                }
            } catch (refreshError) {
                console.log(refreshError, "Token refresh failed");

                deleteCookies([authKey, refreshKey]);

                return Promise.reject(refreshError);
            }
        }

        console.log(
            error,
            "Warning: outside 401 handling, returning original error."
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
