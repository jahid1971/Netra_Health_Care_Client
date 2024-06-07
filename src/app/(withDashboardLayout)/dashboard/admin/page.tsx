import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Grid } from "@mui/material";
import DashboardBarChart from "../../../../components/ui/dashboard/BarChart";

import SummaryCards from "../../../../components/ui/dashboard/SummaryCards";

import DashboardPieChart from "../../../../components/ui/dashboard/PieChart";
import N_LineChart from "../../../../components/ui/dashboard/LineChart";

const AdminDashboardHome = async () => {
    const res = await fetchWithAuth("/metaData", {
        cache: "no-cache",
    });



    const metaData: any = res?.data  || {};

    const pieChartData = metaData?.appointmentsPieData?.map((item:any) => ({
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
