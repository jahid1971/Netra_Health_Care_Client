"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Skeleton, Typography } from "@mui/material";
import CustomSelect from "@/components/ui/Select";
import { useGetBarChartQuery } from "@/redux/api/metaApi";
import { queryPeriods } from "@/constants/commmon";

// const dataset = [
//     { month: 'Jan', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Feb', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Mar', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Apr', totalAppointments: 0, totalAmount: 0 },
//     { month: 'May', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Jun', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Jul', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Aug', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Sep', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Oct', totalAppointments: 0, totalAmount: 0 },
//     { month: 'Nov', totalAppointments: 9, totalAmount: 900 },
//     { month: 'Dec', totalAppointments: 0, totalAmount: 0 }
//   ]

// const valueFormatter = (value) => `${value} mm`;

const chartSetting = {
    // yAxis: [
    //     {
    //         label: "User Activity",
    //     },
    // ],
    // width: 500,
    height: 250,
    // sx: {
    //     [`.${axisClasses.right} .${axisClasses.label}`]: {
    //         transform: "translate(-5px, 0)",
    //     },
    // },
};



export default function DashboardBarChart() {
    const [query, setQuery] = React.useState("lastMonth");
    const { data, isFetching } = useGetBarChartQuery({ queryPeriod: query });
    const barChartData = data?.data || [];
  
    return (
        <Box sx={{ backgroundColor: "white", borderRadius: 2, width: "100%" }}>
            <Box display={"flex"} justifyContent={"space-between"} px={1}>
                <Typography p={1}>User Activity</Typography>

                <CustomSelect
                    items={queryPeriods}
                    setValue={setQuery}
                    value={query}
                />
            </Box>
            {!isFetching ? (
                <BarChart
                    dataset={barChartData}
                    xAxis={[{ scaleType: "band", dataKey: "period" }]}
                    series={[
                        { dataKey: "doctors", label: "Doctors" },
                        { dataKey: "patients", label: "Patients" },
                        { dataKey: "appointments", label: "Appointments" },
                    ]}
                    {...chartSetting}
                />
            ) : (
                <Box>
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        sx={{ mb: 2 }}
                    />

                    <Skeleton variant="rectangular" width="100%" height={200} />
                </Box>
            )}
        </Box>
    );
}
