// "use client"
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Grid, Stack } from "@mui/material";

import { TDashboardData } from "@/types/common";
import SummaryCards from "../../../../components/ui/dashboard/SummaryCards";
import { USER_ROLE } from "@/constants/role";
import DashboardBarChart from "@/components/ui/dashboard/BarChart";
import DashboardPieChart from "@/components/ui/dashboard/PieChart";

// {
//   appointmentCount: 16,
//   patientCount: 10,
//   doctorCount: 3,
//   totalRevenue: 1700,
//   appointmentsPieData: [
//     { status: 'SCHEDULED', count: 15 },
//     { status: 'INPROGRESS', count: 1 }
//   ]
// },
const DoctorDashboardHome = async () => {
    const res = await fetchWithAuth("/metaData", {
        cache: "no-cache",
    });


    const metaData: TDashboardData = res?.data || {};

    const pieChartData =
        metaData?.appointmentsPieData?.map((item) => ({
            value: item.count,
            label: item.status,
        })) || [];

    metaData.totalRevenue = metaData?.totalRevenue * 0.9; // 10% service charge

    return (
        <Box>
            <SummaryCards metaData={metaData} role={USER_ROLE.DOCTOR} />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={7}>
                    <DashboardBarChart />
                </Grid>
                <Grid item xs={12} md={5}>
                    <DashboardPieChart
                        title="Appointments"
                        data={pieChartData}
                    />
                </Grid>
            </Grid>

            {/* <N_LineChart /> */}
        </Box>
    );
};

export default DoctorDashboardHome;
