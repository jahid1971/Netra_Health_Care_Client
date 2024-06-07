import { Stack } from "@mui/material";
import { TDashboardData, TUserRole } from "@/types/common";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import SummaryCard from "./SummaryCard";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { USER_ROLE } from "@/constants/role";

const SummaryCards = ({
    metaData,
    role,
}: {
    metaData: TDashboardData;
    role?: TUserRole;
}) => {
    const doctorCardData = [
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
            title: role === USER_ROLE.DOCTOR ? "Earnings" : "Total Revenue",
            count: metaData?.totalRevenue,
            icon: <MonetizationOnOutlinedIcon />,
        },
    ];

    const adminCardData = [
        {
            title: "Doctors",
            count: metaData?.doctorCount,
            icon: <PersonAddAlt1OutlinedIcon />,
        },
        ...doctorCardData,
    ];
    const cardData = role === USER_ROLE.DOCTOR ? doctorCardData : adminCardData;

    return (
        <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            {cardData?.map((item, index) => (
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
