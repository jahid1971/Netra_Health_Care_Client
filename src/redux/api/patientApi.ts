import {
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { IPatient, TMedicalHistory } from "@/types/Patient";

export const patientApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPatients: queryApiBuilder<IPatient[]>(build, "/patient", [
            tagTypes.user,
        ]),

        updatePatient: updateApiBuilder<IPatient>(
            build,
            "/patient",
            [tagTypes.user],
            {
                contentType: "multipart/form-data",
            }
        ),

        updateMedicalHistory: updateApiBuilder(
            build,
            "/patient/medical-history",
            [tagTypes.user],
            {
                contentType: "multipart/form-data",
                method: "PUT",
            }
        ),

        getPtMedicaltHistory: singleQueryApiBuilder<TMedicalHistory>(
            build,
            "/patient/medical-history",
            [tagTypes.user]
        ),
    }),
});

export const {
    useGetAllPatientsQuery,
    useUpdatePatientMutation,
    useUpdateMedicalHistoryMutation,
    useGetPtMedicaltHistoryQuery,
} = patientApi;
