import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box } from "@mui/material";

const dataset = [
    { month: "Jan", london: 18.9, paris: 12.4, newYork: 12.9, seoul: 13.9 },
    { month: "Feb", london: 28.8, paris: 23.3, newYork: 22.8, seoul: 23.9 },
    { month: "Mar", london: 39.3, paris: 35.8, newYork: 32.8, seoul: 33.9 },
    { month: "Apr", london: 81.4, paris: 69.8, newYork: 62.8, seoul: 63.9 },
    { month: "May", london: 147.2, paris: 128.3, newYork: 112.8, seoul: 113.9 },
    { month: "Jun", london: 216.9, paris: 195.4, newYork: 172.8, seoul: 173.9 },
    { month: "Jul", london: 269.5, paris: 256.9, newYork: 232.8, seoul: 233.9 },
    { month: "Aug", london: 295.3, paris: 270.4, newYork: 252.8, seoul: 253.9 },
    { month: "Sep", london: 233.2, paris: 210.3, newYork: 192.8, seoul: 193.9 },
    { month: "Oct", london: 183.3, paris: 160.9, newYork: 142.8, seoul: 143.9 },
    { month: "Nov", london: 104.0, paris: 104.9, newYork: 92.8, seoul: 93.9 },
    { month: "Dec", london: 41.0, paris: 40.9, newYork: 32.8, seoul: 33.9 },
];

// const valueFormatter = (value) => `${value} mm`;

const chartSetting = {
    yAxis: [
        {
            label: "rainfall (mm)",
        },
    ],
    width: 500,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-20px, 0)",
        },
    },
};

export default async function DashboardBarChart() {


    return (
        <Box>
            <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                    { dataKey: "london", label: "London" },
                    { dataKey: "paris", label: "Paris" },
                    { dataKey: "newYork", label: "New York" },
                    { dataKey: "seoul", label: "Seoul" },
                ]}
                {...chartSetting}
            />
        </Box>
    );
}
