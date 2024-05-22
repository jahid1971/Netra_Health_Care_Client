import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";
import { TAppointment } from "@/types/Appointment";
import { Videocam } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import TodaysAppointments from "./TodaysAppointments";
import WritePrescription from "./WritePrescription";
import MedicalHistory from "@/app/(withDashboardLayout)/dashboard/patient/medical-history/page";

const SideArea = ({
    appointments,
    currentAppointment,
    drawerContainer,
}: {
    appointments: TAppointment[];
    currentAppointment: TAppointment;
    drawerContainer: string;
}) => {
    return (
        <Box p={2}>
            {drawerContainer === "todaysAppointments" && (
                <TodaysAppointments
                    appointments={appointments}
                    currentAppointment={currentAppointment}
                />
            )}
            {drawerContainer === "writePrescription" && (
                <WritePrescription currentAppointment={currentAppointment} />
            )}
            {drawerContainer === "medicalHistory" && <MedicalHistory />}
        </Box>
    );
};

export default SideArea;
