import { IResponseRedux } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyProfile: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
            
            transformResponse: (response: any) => {
                return  response?.data ;
            },
        }),
    }),
});

export const { useGetMyProfileQuery } = userApi;
