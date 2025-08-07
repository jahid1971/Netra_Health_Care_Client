import { IDoctor } from "@/types/Doctors";
import { baseApi } from "./baseApi";

export interface IAiSuggestionResponse {
    suggestedDoctores: {
        data: IDoctor[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    };
    availableSpecialty: string | null;
    requiredSpecialty: string | null;
}

export const aiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Analyze patient symptoms and get suggested doctors and specialties
        suggestSpecialist: builder.mutation<
            IAiSuggestionResponse,
            { symptoms: string }
        >({
            query: (body) => ({
                url: "/ai/suggest-specialist",
                method: "POST",
                data: body,
            }),
            transformResponse: (response: any) => response?.data,
        }),
    }),
});

export const { useSuggestSpecialistMutation } = aiApi;
