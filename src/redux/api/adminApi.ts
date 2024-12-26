import {
    createApiBuilder,
    queryApiBuilder,
    updateApiBuilder,
    deleteApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { IAdmin } from "@/types/Admin";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        craeteAdmin: createApiBuilder(
            build,
            "/user/create-admin",
            [tagTypes.user],
            {
                contentType: "multipart/form-data",
            }
        ),

        getAllAdmins: queryApiBuilder<IAdmin[]>(build, "/admin", [
            tagTypes.user,
        ]),

        updateAdmin: updateApiBuilder(
            build,
            "/admin",
            [tagTypes.doctor, tagTypes.user],
            { contentType: "multipart/form-data" }
        ),
        
        deleteAdmin: deleteApiBuilder(build, "/admin", [
            tagTypes.user,
        ]),
    }),
});

export const { 
    useCraeteAdminMutation, 
    useGetAllAdminsQuery, 
    useUpdateAdminMutation,
    useDeleteAdminMutation
} = adminApi;
