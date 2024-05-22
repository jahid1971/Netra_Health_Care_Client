"use client";

import { useRef, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Paper,
    Avatar,
} from "@mui/material";

import type {
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    IAgoraRTCClient,
    IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

import {
    VERSION,
    createCameraVideoTrack,
    createClient,
    createMicrophoneAudioTrack,
    onCameraChanged,
    onMicrophoneChanged,
} from "agora-rtc-sdk-ng/esm";
import VideoArea from "./VideoArea";
import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";
import Image from "next/image";
import { blue, grey, red } from "@mui/material/colors";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
import SideArea from "./SideArea";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCallDrawer from "./VideoCallDrawer";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { USER_ROLE } from "@/constants/role";
import dayjs from "dayjs";

onCameraChanged((device) => {
    console.log("onCameraChanged: ", device);
});
onMicrophoneChanged((device) => {
    console.log("onMicrophoneChanged: ", device);
});

const client: IAgoraRTCClient = createClient({
    mode: "rtc",
    codec: "vp8",
});
let audioTrack: IMicrophoneAudioTrack;
let videoTrack: ICameraVideoTrack;

function VideoCall({ videoCallingId }: { videoCallingId: string }) {
    const [videoCallUi, setVideoCallUi] = useState(false);
    const [isAudioOn, setIsAudioOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(false);
    const [isAudioPubed, setIsAudioPubed] = useState(false);
    const [isVideoPubed, setIsVideoPubed] = useState(false);
    const [isVideoSubed, setIsVideoSubed] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerContainer, setDrawerContainer] = useState("medicalHistory");

    const user = useAppSelector(selectUser);
    const channel = useRef("");
    const appid = useRef("");
    const token = useRef("");

    const { data } = useGetMyAppointmentQuery({
        videoCallingId: videoCallingId,
    });

    const currentAppointment = data?.data ? data?.data[0] : null;

    const { data: userData } = useGetMyProfileQuery(undefined);

    const { data: appointments } = useGetMyAppointmentQuery({
        startDate: dayjs().startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
    });
    const todaysAppointments = appointments?.data;

    // const handleDrawerToggle = () => {
    //     setIsDrawerOpen(!isDrawerOpen);
    // };

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

    return (
        <Box
            sx={{
                px: 3,
                display: "flex",
                gap: 5,
                justifyContent: "space-between",
            }}
        >
            <Box width="100%" display="flex" flexDirection="column" gap={2}>
                {/* <Box
                id="camera-video"
                sx={{
                    width: "100%",
                    height: "250px",
                    backgroundColor: "#f0f0f0",
                    display: isVideoOn ? "block" : "none",
                }}
            ></Box> */}
                <Stack direction="row" spacing={5} width={"100%"} px={2} mt={2}>
                    <Stack
                        sx={{
                            width: isDrawerOpen ? "55%" : "70%",
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
                                {userData?.data?.role === USER_ROLE.DOCTOR
                                    ? "Patient Name:"
                                    : "Doctor Name:"}
                            </Typography>
                            <Typography
                                color={grey[600]}
                                fontSize={"18px"}
                                fontWeight={700}
                                display={"inline"}
                            >
                                {` ` +
                                    (userData?.data?.role === USER_ROLE.DOCTOR
                                        ? currentAppointment?.patient?.name
                                        : currentAppointment?.doctor?.name)}
                            </Typography>
                        </Box>
                        <VideoArea
                            videoCallUi={videoCallUi}
                            videoCallingId={videoCallingId}
                            userData={userData?.data}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            width: "30%",
                            maxHeight: "450px",
                            overflow: "auto",
                            pt: 5,
                            // backgroundColor: "secondary.main",
                            // p: 2,
                        }}
                        justifyContent={"space-between"}
                    >
                        {/* <SideArea /> */}
                        <Button
                            endIcon={<MenuIcon />}
                            variant="outlined"
                            fullWidth
                            size="large"
                            sx={{ borderRadius: "20px" }}
                            onClick={handleMediHistoryDrawer}
                        >
                            Patient Medical Info
                        </Button>
                        {userData?.data?.role === USER_ROLE.DOCTOR && (
                            <Button
                                endIcon={<MenuIcon />}
                                variant="outlined"
                                size="large"
                                fullWidth
                                sx={{ borderRadius: "20px" }}
                                onClick={handleWritePrescriptionDrawer}
                            >
                                Write Prescription
                            </Button>
                        )}
                        {userData?.data?.role === USER_ROLE.DOCTOR && (
                            <Button
                                endIcon={<MenuIcon />}
                                variant="outlined"
                                size="large"
                                fullWidth
                                sx={{ borderRadius: "20px" }}
                                onClick={handletodayAppointmentsDrawer}
                            >
                                Today's Appointments
                            </Button>
                        )}
                        <VideoCallDrawer
                            isDrawerOpen={isDrawerOpen}
                            // handleDrawerToggle={handleDrawerToggle}
                            handleDrawerClose={() => setIsDrawerOpen(false)}
                            drawerContainer={drawerContainer}
                            appointments={todaysAppointments}
                            currentAppointment={currentAppointment}
                        />
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}

export default VideoCall;
