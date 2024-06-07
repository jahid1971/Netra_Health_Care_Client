"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

import { Box, Skeleton, Typography } from "@mui/material";
import CustomSelect from "@/components/ui/Select";
import { useGetBarChartQuery } from "@/redux/api/metaApi";
import { queryPeriods } from "@/constants/commmon";
import { useUserSelector } from "@/redux/slices/authSlice";
import { USER_ROLE } from "@/constants/role";

const chartSetting = {
    height: 250,
};

export default function DashboardBarChart() {
    const [query, setQuery] = React.useState("lastMonth");
    const { data, isFetching } = useGetBarChartQuery({ queryPeriod: query });
    const barChartData: any = data?.data || [];
    const user = useUserSelector();

    return (
        <Box sx={{ backgroundColor: "white", borderRadius: 2, width: "100%" }}>
            <Box display={"flex"} justifyContent={"space-between"} px={1}>
                <Typography p={1}>Activity</Typography>

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
                        ...(user?.role !== USER_ROLE?.DOCTOR
                            ? [{ dataKey: "doctors", label: "Doctors" }]
                            : []),
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
