import { Stack } from "@mui/material";
import { TDashboardData } from "@/types/common";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import SummaryCard from "./DashboardCard/SummaryCard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

const SummaryCards = ({ metaData }: { metaData: TDashboardData }) => {
    const summayCardData = [
        {
            title: "Doctors",
            count: metaData?.doctorCount,
            icon: <PersonAddAlt1OutlinedIcon />,
        },
        {
            title: "Patients",
            count: metaData?.patientCount,
            icon: <AirlineSeatReclineExtraOutlinedIcon />,
        },
        {
            title: "Appoinment",
            count: metaData?.appointmentCount,
            icon: <AssignmentOutlinedIcon />,
        },
        {
            title: "Revenue",
            count: metaData?.totalRevenue,
            icon: <MonetizationOnOutlinedIcon />,
        },
    ];
    return (
        <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            {summayCardData.map((item, index) => (
                <SummaryCard
                    key={index}
                    title={item.title}
                    count={item.count}
                    icon={item.icon}
                />
            ))}
        </Stack>
    );
};

export default SummaryCards;
