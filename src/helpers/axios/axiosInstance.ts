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

        const originalRequest = error.config;
        //  ._retry is to prevent infinite loop
        if (error?.response?.status === 500 && !originalRequest._retry) {
            console.log("refresh req sent");
            originalRequest._retry = true;
            try {
                const response = await getNewAccessToken();
                const accessToken = response?.data?.data?.accessToken;
                if (accessToken) {
                    originalRequest.headers["Authorization"] = accessToken;

                    setTokenToCookies(authKey, accessToken);
                    
                    return instance(originalRequest);
                } else {
                    deleteCookies([authKey, refreshKey]);
                }
            } catch (refreshError) {
                console.log(refreshError, "Token refresh failed");

                deleteCookies([authKey, refreshKey]);

                return Promise.reject(refreshError);
            }
        }
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
