import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import AdminDashboardHome from "./admin/page";

const DashboardHomePage = () => {
    const userInfo = getUserInfo();
    return (
        <Box>
            {userInfo?.role === USER_ROLE.ADMIN && <AdminDashboardHome />}
        </Box>
    );
};

export default DashboardHomePage;
