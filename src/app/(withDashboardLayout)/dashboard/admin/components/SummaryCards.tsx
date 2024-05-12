import { Stack } from "@mui/material";
import { TDashboardData } from "@/types/common";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import SummaryCard from "./DashboardCard/SummaryCard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const SummaryCards = ({ metaData }: { metaData: TDashboardData }) => {
    return (
        <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <SummaryCard
                title={"Doctors"}
                count={metaData?.doctorCount}
                icon={<PersonAddAlt1OutlinedIcon />}
            />
            <SummaryCard
                title={"Patients"}
                count={metaData.patientCount}
                icon={<AirlineSeatReclineExtraOutlinedIcon />}
            />
            <SummaryCard
                title={"Appoinment"}
                count={metaData.appointmentCount}
                icon={<AssignmentOutlinedIcon />}
            />
            <SummaryCard
                title={"Revenue"}
                count={metaData?.totalRevenue?._sum?.amount}
                icon={<MonetizationOnOutlinedIcon />}
            />
            {/* <DashboardCard />
    <DashboardCard />
    <DashboardCard /> */}
        </Stack>
    );
};

export default SummaryCards;
