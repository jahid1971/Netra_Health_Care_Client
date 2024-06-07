import { queryApiBuilder } from "@/utils/apiBuilders";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const metaApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBarChart: queryApiBuilder(build, "/metaData/bar-chart", [
            tagTypes.appointment,
        ]),

        getLineChart: queryApiBuilder<
            { period: string; totalAmount: number }[]
        >(build, "/metaData/line-chart", [tagTypes.appointment]),
    }),
});

export const { useGetBarChartQuery, useGetLineChartQuery } = metaApi;
