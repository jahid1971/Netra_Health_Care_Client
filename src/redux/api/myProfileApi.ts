import { IResponseRedux } from "@/types/common";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { updateApiBuilder } from "@/utils/apiBuilders";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyProfile: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: [tagTypes.user],

            transformResponse: (response: any) => {
                return response?.data;
            },
        }),

        updateMyProfile: updateApiBuilder(build, "/user/update-my-profile", [tagTypes.user], {
            contentType: "multipart/form-data",
        }),
    }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi;
