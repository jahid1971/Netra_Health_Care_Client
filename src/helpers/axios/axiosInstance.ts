import { authKey } from "@/constants/authKey";
import { IGenericErrorResponse, TResponeSuccess } from "@/types/common";
import { getFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";

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

// Add a response interceptor
instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        console.log(response?.data, "response in axios instance")
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const responseObject: TResponeSuccess = {
            data: response?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log(error);
        const config = error.config;
        // console.log(config);
        if (error?.response?.status === 500 && !config.sent) {
            config.sent = true;
            //  const response = await getNewAccessToken();
            //  const accessToken = response?.data?.accessToken;
            //  config.headers['Authorization'] = accessToken;
            //  setToLocalStorage(authKey, accessToken);
            //  setAccessToken(accessToken);
            return instance(config);
        } else {
            console.log(error.response, "error in axios instance")
            return Promise.reject(error);
        }
    }
);

export { instance };
