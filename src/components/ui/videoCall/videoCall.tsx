"use client";

import { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

import { onCameraChanged, onMicrophoneChanged } from "agora-rtc-sdk-ng/esm";
import VideoArea from "./VideoArea";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { blue, grey } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";
import VideoCallDrawer from "./VideoCallDrawer";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { USER_ROLE } from "@/constants/role";
import dayjs from "dayjs";
import MessageIcon from "./videoSidebarComp/MessageIcon";

onCameraChanged((device) => {
    console.log("onCameraChanged: ", device);
});
onMicrophoneChanged((device) => {
    console.log("onMicrophoneChanged: ", device);
});

function VideoCall({ videoCallingId }: { videoCallingId: string }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContainer, setDrawerContainer] = useState("medicalHistory");
    const [isJoined, setIsJoined] = useState(false);

    const { data, refetch } = useGetAllAppointmentsQuery({
        videoCallingId: videoCallingId,
        skip: !videoCallingId,
    });

    const currentAppointment = data?.data ? data?.data[0] : null;

    const { data: currentUserData } = useGetMyProfileQuery(undefined);

    const userData = currentUserData?.data;

    const { data: appointments } = useGetAllAppointmentsQuery({
        startDate: dayjs().startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
    });
    const todaysAppointments = appointments?.data;

    const handleMediHistoryDrawer = () => {
        setDrawerContainer("medicalHistory");
        setIsDrawerOpen(true);
    };

    const handleWritePrescriptionDrawer = () => {
        setDrawerContainer("writePrescription");
        setIsDrawerOpen(true);
    };

    const handletodayAppointmentsDrawer = () => {
        setDrawerContainer("todaysAppointments");
        setIsDrawerOpen(true);
    };

    const handleChatBoxDrawer = () => {
        setDrawerContainer("chatBox");
        setIsDrawerOpen(true);
    };

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={5}
            width={"100%"}
            px={{ xs: 1, md: 5 }}
            pt={{ xs: 0, md: 2 }}
            pb={{ xs: 2, md: 0 }}
        >
            <Stack
                sx={{
                    width: { xs: "100%", md: isDrawerOpen ? "55%" : "70%" },
                    transition: "width 0.3s ease-in-out",
                }}
            >
                <Box my={1}>
                    <Typography
                        color={grey[500]}
                        fontSize={"16px"}
                        fontWeight={700}
                        display={"inline"}
                    >
                        {userData?.role === USER_ROLE.DOCTOR
                            ? "Patient Name:"
                            : "Doctor Name:"}
                    </Typography>
                    <Typography
                        color={blue[600]}
                        fontSize={"18px"}
                        fontWeight={700}
                        display={"inline"}
                    >
                        {` ` +
                            (userData?.role === USER_ROLE.DOCTOR
                                ? currentAppointment?.patient?.name
                                : currentAppointment?.doctor?.name)}
                    </Typography>
                </Box>
                <VideoArea
                    videoCallingId={videoCallingId}
                    userData={userData}
                    currentAppointment={currentAppointment}
                    isJoined={isJoined}
                    setIsJoined={setIsJoined}
                    refetch={refetch}
                />
            </Stack>
            <Stack
                sx={{
                    width: { xs: "100%", md: "30%" },
                    maxHeight: "450px",
                    overflow: "auto",
                    pt: { xs: 10, md: 5 },
                    // backgroundColor: "secondary.main",
                    // p: 2,
                }}
                spacing={{ xs: 2, md: 0 }}
                justifyContent={"space-between"}
            >
                {/* <SideArea /> */}
                <Button
                    startIcon={<MenuIcon />}
                    variant="outlined"
                    fullWidth
                    // size="large"
                    sx={{ borderRadius: "20px" }}
                    onClick={handleMediHistoryDrawer}
                >
                    Patient Medical Info
                </Button>
                {userData?.role === USER_ROLE.DOCTOR && (
                    <Button
                        startIcon={<MenuIcon />}
                        variant="outlined"
                        // size="large"
                        fullWidth
                        sx={{ borderRadius: "20px" }}
                        onClick={handleWritePrescriptionDrawer}
                    >
                        Write Prescription
                    </Button>
                )}
                {userData?.role === USER_ROLE.DOCTOR && (
                    <Button
                        startIcon={<MenuIcon />}
                        variant="outlined"
                        // size="large"
                        fullWidth
                        sx={{ borderRadius: "20px" }}
                        onClick={handletodayAppointmentsDrawer}
                    >
                        Today&apos;s Appointments
                    </Button>
                )}

                <Button
                    startIcon={
                        <MessageIcon
                            userData={userData}
                            currentAppointment={currentAppointment}
                        />
                    }
                    variant="outlined"
                    // size="large"
                    fullWidth
                    sx={{ borderRadius: "20px" }}
                    onClick={handleChatBoxDrawer}
                >
                    Chat with{" "}
                    {userData?.role === USER_ROLE.DOCTOR ? "Patient" : "Doctor"}
                </Button>
                <VideoCallDrawer
                    isDrawerOpen={isDrawerOpen}
                    // handleDrawerToggle={handleDrawerToggle}
                    handleDrawerClose={() => {
                        setIsDrawerOpen(false);
                        setDrawerContainer("");
                    }}
                    drawerContainer={drawerContainer}
                    appointments={todaysAppointments}
                    currentAppointment={currentAppointment}
                    userData={userData}
                    isJoined={isJoined}
                />
            </Stack>
        </Stack>
    );
}

export default VideoCall;
