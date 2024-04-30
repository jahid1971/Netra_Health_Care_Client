
import { RestartAlt } from "@mui/icons-material";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { createApiBuilder } from "@/utils/apiBuilders";

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: createApiBuilder(build, "/auth/change-password", [tagTypes.user]),

        forgotPassword: createApiBuilder(build, "/auth/forgot-password", [tagTypes.user]),

        resetPassword: createApiBuilder(build, "/auth/reset-password", [tagTypes.user]),
    }),
});

export const { useChangePasswordMutation, useForgotPasswordMutation,useResetPasswordMutation } = userApi;
