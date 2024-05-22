import {
    createApiBuilder,
    deleteApiBuilder,
    queryApiBuilder,
    singleQueryApiBuilder,
    updateApiBuilder,
} from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";
import { IDoctor } from "@/types/Doctors";
import { TPrescription } from "@/types/Prescription";

const prescriptionAPi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createPrescription: createApiBuilder(build, "/prescription", [
            tagTypes.prescription,
        ]),

        getMyPrescriptions: queryApiBuilder<TPrescription[]>(
            build,
            "/prescription/my-prescriptions",
            [tagTypes.prescription]
        ),

        getPrescriptions: queryApiBuilder<TPrescription[]>(build, "/prescription", [
            tagTypes.prescription,
        ]),

        // getSinglePrescription: singleQueryApiBuilder<IDoctor>(build, "/prescription", [
        //     tagTypes.prescription,
        // ]),

        // deletePrescription: deleteApiBuilder(build, "/prescription/soft", [
        //     tagTypes.prescription,
        // ]),
    }),
});

export const {useCreatePrescriptionMutation,useGetMyPrescriptionsQuery} = prescriptionAPi;
