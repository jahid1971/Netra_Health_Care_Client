"use client";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { TAppointment } from "@/types/Appointment";
import { Videocam } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import TodaysAppointments from "./videoSidebarComp/TodaysAppointments";

import MedicalHistory from "@/app/(withDashboardLayout)/dashboard/patient/medical-history/page";
import ChatBox from "../chat/ChatBox";
import WritePrescription from "./videoSidebarComp/WritePrescription";
import { TUser } from "@/types/common";

const SideArea = ({
    appointments,
    currentAppointment,
    drawerContainer,
    userData,
    isJoined
}: {
    appointments: TAppointment[];
    currentAppointment: TAppointment;
    drawerContainer: string;
    userData: TUser;
    isJoined: boolean;
}) => {
    return (
        <Box height={"100%"}>
            {drawerContainer === "todaysAppointments" && (
                <TodaysAppointments
                    appointments={appointments}
                    currentAppointment={currentAppointment}
                    isJoined={isJoined}
                />
            )}
            {drawerContainer === "writePrescription" && (
                <WritePrescription currentAppointment={currentAppointment} />
            )}
            {drawerContainer === "chatBox" && (
                <ChatBox
                    currentAppointment={currentAppointment}
                    userData={userData}
                />
            )}
            {drawerContainer === "medicalHistory" && <MedicalHistory />}
        </Box>
    );
};

export default SideArea;
