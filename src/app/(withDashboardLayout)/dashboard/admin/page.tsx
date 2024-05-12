import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Box, Stack } from "@mui/material";
import DashboardBarChart from "./components/BarChart";
import DashboardCard from "./components/DashboardCard/SummaryCard";
import { TDashboardData } from "@/types/common";
import SummaryCards from "./components/SummaryCards";

const AdminDashboardHome = async () => {
    const res = await fetchWithAuth("/metadata", {
        next: { revalidate: 30 },
    });
    const metaData: TDashboardData = res?.data;
    console.log(metaData, metaData.doctorCount, "metaData.doctorCount");
    return (
        <Box>
            <SummaryCards metaData={metaData} />

            <DashboardBarChart />
        </Box>
    );
};

export default AdminDashboardHome;
