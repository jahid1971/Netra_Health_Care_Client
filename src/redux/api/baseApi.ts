import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../tagTypes";
import { baseUrl } from "@/constants/commmon";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: `${baseUrl}` }),
    endpoints: () => ({}),
    tagTypes: Object.values(tagTypes),
});
