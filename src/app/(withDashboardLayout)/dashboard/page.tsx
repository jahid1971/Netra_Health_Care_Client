import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import AdminDashboardHome from "./admin/page";
import PatientDoctorsPage from "./patient/doctors/page";
import DoctorPageComponent from "@/app/(withCommonLayout)/doctors/components/DoctorPage";

const DashboardHomePage = ({
    searchParams,
}: {
    searchParams: {
        specialty?: string;
    };
}) => {
    const userInfo = getUserInfo();
    return (
        <Box>
            {userInfo?.role === USER_ROLE.ADMIN && <AdminDashboardHome />}
            {userInfo?.role === USER_ROLE.PATIENT && (
                <DoctorPageComponent
                    searchParams={searchParams}
                    withDashboardLayout={true}
                />
            )}
        </Box>
    );
};

export default DashboardHomePage;
