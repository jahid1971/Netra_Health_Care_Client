import {
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updatePatient: updateApiBuilder(build, "/patient", [tagTypes.user], {
            contentType: "multipart/form-data",
        }),

        updateMedicalHistory: updateApiBuilder(
            build,
            "/patient/medical-history",
            [tagTypes.user],
            {
                contentType: "multipart/form-data",
                method: "PUT",
            }
        ),

        getPtMedicaltHistory: singleQueryApiBuilder(
            build,
            "/patient/medical-history",
            [tagTypes.user]
        ),
    }),
});

export const {
    useUpdatePatientMutation,
    useUpdateMedicalHistoryMutation,
    useGetPtMedicaltHistoryQuery,
} = patientApi;
