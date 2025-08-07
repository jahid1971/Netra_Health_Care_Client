import { baseApi } from "./baseApi";

export const aiApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        analyzeSymptoms: builder.mutation<any, { description: string }>({
            query: (body) => ({
                url: "/ai/symptom-analysis", // Adjust endpoint as needed
                method: "POST",
                data: body,
            }),
        }),
    }),
});

export const { useAnalyzeSymptomsMutation } = aiApi;
