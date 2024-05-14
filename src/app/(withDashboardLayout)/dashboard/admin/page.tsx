import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Grid, Stack } from "@mui/material";
import DashboardBarChart from "./components/BarChart";
import DashboardCard from "./components/DashboardCard/SummaryCard";
import { TDashboardData } from "@/types/common";
import SummaryCards from "./components/SummaryCards";
import SummaryCard from "./components/DashboardCard/SummaryCard";
import { SummaryCardsData } from "@/constants/summaryCardsData";
import DashboardPieChart from "./components/PieChart";
import N_LineChart from "./components/LineChart";

const AdminDashboardHome = async () => {
    const res = await fetchWithAuth("/metaData", {
        cache: "no-cache",
    });

    console.log(res?.data, "res of meteData______________________________");

    const metaData: TDashboardData = res?.data  || {};

    const pieChartData = metaData?.appointmentsPieData?.map((item) => ({
        value: item.count,
        label: item.status,
    })) || [];


    return (
        <Box>
            <SummaryCards metaData={metaData} />


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

            <N_LineChart />


        </Box>
    );
};

export default AdminDashboardHome;
