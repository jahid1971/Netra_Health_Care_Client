"use client";
import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useGetLineChartQuery } from "@/redux/api/metaApi";
import CustomSelect from "@/components/ui/Select";
import { queryPeriods } from "@/constants/commmon";

export default function N_LineChart() {
    const [query, setQuery] = React.useState("lastMonth");

    const { data } = useGetLineChartQuery({ queryPeriod: query });

    const xAxis = data?.data?.map((item) => item.period) || [];
    const yAxis = data?.data?.map((item) => item.totalAmount) || [];


    return (
        <Box sx={{ backgroundColor: "white", my: 2 }}>
            <Box >
            <CustomSelect
                    items={queryPeriods}
                    setValue={setQuery}
                    value={query}
                    sx={{ display: "flex", justifyContent: "flex-end",mr:2 }}
                />
            </Box>
            <LineChart
                xAxis={[{ data: xAxis, scaleType: "point" }]}
                series={[
                    {
                        data: yAxis,
                        area: true,
                        color: blue[500],
                        showMark: false,
                        label: 'Revenue'
                    },
                ]}
                // width={500}
                height={300}
            />
        </Box>
    );
}
