import { IDoctor } from "@/types/Doctors";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { queryApiBuilder, updateApiBuilder } from "@/utils/apiBuilders";
import { IPatient } from "@/types/Patient";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMyProfile: queryApiBuilder<IDoctor & IPatient>(build, "/user/me", [
            tagTypes.user,
        ]),

        updateMyProfile: updateApiBuilder(
            build,
            "/user/update-my-profile",
            [tagTypes.user],
            {
                contentType: "multipart/form-data",
            }
        ),
    }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi;
