import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/actions/auth.services";
import { Box } from "@mui/material";
import AdminDashboardHome from "./admin/page";
import PatientDoctorsPage from "./patient/doctors/page";
import DoctorPageComponent from "@/app/(withCommonLayout)/doctors/components/DoctorPage";
import DoctorDashboardHome from "./doctor/page";

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
            {(userInfo?.role === USER_ROLE.ADMIN ||
                userInfo?.role === USER_ROLE.SUPER_ADMIN) && (
                <AdminDashboardHome />
            )}
            {userInfo?.role === USER_ROLE.PATIENT && (
                <DoctorPageComponent
                    searchParams={searchParams}
                    withDashboardLayout={true}
                />
            )}

            {userInfo?.role === USER_ROLE.DOCTOR && <DoctorDashboardHome />}
        </Box>
    );
};

export default DashboardHomePage;
