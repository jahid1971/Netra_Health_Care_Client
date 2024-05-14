import { TDashboardData } from "@/types/common";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AirlineSeatReclineExtraOutlinedIcon from "@mui/icons-material/AirlineSeatReclineExtraOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export const SummaryCardsData = (metaData: TDashboardData) => {
    const summayCardData = [
        {
            title: "Doctors",
            count: metaData?.doctorCount,
            icon: PersonAddAlt1OutlinedIcon,
        },
        {
            title: "Patients",
            count: metaData?.patientCount,
            icon: AirlineSeatReclineExtraOutlinedIcon,
        },
        {
            title: "Appoinment",
            count: metaData?.appointmentCount,
            icon: AssignmentOutlinedIcon,
        },
        {
            title: "Revenue",
            count: metaData?.totalRevenue,
            icon: MonetizationOnOutlinedIcon,
        },
    ];
    return summayCardData;
};
