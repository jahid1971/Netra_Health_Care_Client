
"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    CallEnd,
    Fullscreen,
    FullscreenExit,
    Mic,
    MicOff,
    Videocam,
    VideocamOff,
} from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import type {
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
    IAgoraRTCClient,
    IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import {
    createCameraVideoTrack,
    createClient,
    createMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng/esm";
import Link from "next/link";
import { getUserInfo } from "@/services/actions/auth.services";
import { useUserSelector } from "@/redux/slices/authSlice";
import { TUser } from "@/types/common";

const client: IAgoraRTCClient = createClient({
    mode: "rtc",
    codec: "vp8",
});

let audioTrack: IMicrophoneAudioTrack | null = null;
let videoTrack: ICameraVideoTrack | null = null;

const VideoArea = ({
    videoCallingId,
    userData,
    videoCallUi,
}: {
    videoCallingId: string;
    videoCallUi: boolean;
    userData: TUser;
}) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [isAudioPubed, setIsAudioPubed] = useState(false);
    const [isVideoPubed, setIsVideoPubed] = useState(false);

    const appid = process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "";
    const channel = videoCallingId;
    const uid = userData?.doctorId || userData?.patientId;

    const turnOnCamera = async (enabled: boolean = true) => {
        // if (enabled && isVideoEnabled) return;
        setIsVideoEnabled(enabled);
        if (enabled) {
            if (!videoTrack) videoTrack = await createCameraVideoTrack();
            videoTrack?.setEnabled(true);
            videoTrack?.play("camera-video");
        } else if (videoTrack) {
            videoTrack?.setEnabled(false);
        }
    };

    const turnOnMicrophone = async (enabled: boolean = true) => {
        setAudioEnabled(enabled);
        if (enabled) {
            if (!audioTrack)
                audioTrack =
                    (await createMicrophoneAudioTrack()) as unknown as IMicrophoneAudioTrack;
            audioTrack?.setEnabled(true);
        } else if (audioTrack) {
            audioTrack?.setEnabled(false);
        }
    };

    const joinChannel = async () => {
        if (isJoined) return;

        client.on("user-published", async (user, mediaType) => {
            // await client.subscribe(user, mediaType);
            const remoteTrack = await client.subscribe(user, mediaType);
            if (mediaType === "video") {
                remoteTrack?.play("remote-video");
            } else {
                remoteTrack?.play();
            }

            // setRemoteUsers((prevUsers) => [...prevUsers, user]);
            // setRemoteUsers(user);
        });

        userData && (await client.join(appid, channel, null, uid));
        setIsJoined(true);
    };

    const leaveChannel = async () => {
        await client.leave();
        // setRemoteUsers(null);
        setIsJoined(false);
    };

    const startCall = async () => {
        try {
            if (!isJoined) {
                await joinChannel();
            }

            if (!audioTrack) {
                audioTrack =
                    (await createMicrophoneAudioTrack()) as unknown as IMicrophoneAudioTrack;
            }
            if (!isAudioPubed) {
                await client.publish(audioTrack);
                setIsAudioPubed(true);
            }

            if (!videoTrack) {
                videoTrack =
                    (await createCameraVideoTrack()) as unknown as ICameraVideoTrack;
            }
            if (!isVideoPubed) {
                videoTrack?.play("camera-video");
                await client.publish(videoTrack);
                setIsVideoPubed(true);
            }

            setAudioEnabled(true);
            setIsVideoEnabled(true);
        } catch (error) {
            console.error("Error starting the call:", error);
        }
    };

    const unpublishTrack = async (
        track: IMicrophoneAudioTrack | ICameraVideoTrack | null,
        setPublished: (value: boolean) => void
    ) => {
        if (!isJoined) return;
        if (track) {
            await client.unpublish(track);
            track.stop();
            track.close();
            setPublished(false);
        }
    };

    const endCall = async () => {
        await unpublishTrack(videoTrack, setIsVideoPubed);
        await unpublishTrack(audioTrack, setIsAudioPubed);
        await leaveChannel();
        setIsVideoEnabled(false);
        setAudioEnabled(false);
        // await turnOnCamera(false);
        // await turnOnMicrophone(false);
        videoTrack = null;
        audioTrack = null;
    };

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            videoContainerRef.current?.requestFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        if (!isFullscreen) return setShowControls(true);
        if (showControls && isFullscreen) {
            setTimeout(() => {
                setShowControls(false);
            }, 4000);
        }
    }, [showControls, isFullscreen]);

    useEffect(() => {
        const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
            setRemoteUsers((prevUsers) => [...prevUsers, user]);
        };

        const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
            setRemoteUsers((prevUsers) =>
                prevUsers.filter((u) => u.uid !== user.uid)
            );
        };

        client.on("user-joined", handleUserJoined);
        client.on("user-left", handleUserLeft);

        return () => {
            client.off("user-joined", handleUserJoined);
            client.off("user-left", handleUserLeft);
        };
    }, []);



    // useEffect(() => {
    //     const initializeTracks = async () => {
    //         await turnOnCamera(true); // Turn on the camera
    //         await turnOnMicrophone(true); // Turn on the microphone
    //     };

    //     initializeTracks();

    //     return () => {
    //         if (videoTrack) {
    //             videoTrack.stop();
    //             videoTrack.close();
    //         }
    //         if (audioTrack) {
    //             audioTrack.stop();
    //             audioTrack.close();
    //         }
    //         videoTrack = null;
    //         audioTrack = null;
    //     };
    // }, []);

    

    return (
        <Stack>
            <Box
                ref={videoContainerRef}
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    // border: "1px solid black",
                    // overflow: "hidden",
                    backgroundColor: "#000",
                    aspectRatio: "16/9",
                    borderRadius: "10px 10px 0 0",
                }}
            >
                {isJoined &&
                    !remoteUsers.filter((user) => user.uid !== uid).length && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                color: "primary.main",
                                fontSize: "1.5rem",
                            }}
                        >
                            {userData?.patientId
                                ? "Please Wait.Doctor will join soon..."
                                : "Please Wait untill patient joins or schedule period ends..."}
                        </Box>
                    )}

                <video
                    ref={videoRef}
                    id={isJoined ? "remote-video" : "camera-video"}
                    style={{ width: "100%", height: "100%" }}
                    autoPlay
                ></video>
                {/* {!isVideoEnabled && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            color: "white",
                        }}
                    >
                        Video Disabled
                    </Box>
                )} */}

                {/* Remote User Videos */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                    }}
                >
                    {/* {remoteUsers.map((user) => (
                        <Box
                            key={user.uid}
                            id={`remote-video-${user.uid}`}
                            sx={{
                                width: "150px",
                                height: "100px",
                                // border: "1px solid white",
                                backgroundColor: "white",
                            }}
                        ></Box>
                    ))} */}
                    <Box
                        id={isJoined ? "camera-video" : "remote-video"}
                        sx={{
                            width: isFullscreen ? "200px" : "150px",
                            height: isFullscreen ? "150px" : 100,
                            // border: "1px solid white",
                            // backgroundColor: "white",
                        }}
                    ></Box>
                </Box>

                {/* Control Buttons */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: isFullscreen ? 10 : -50,
                        left: isFullscreen ? 10 : 0,
                        right: isFullscreen ? 10 : 0,
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: blue[500],
                        padding: "5px 10px",
                        borderRadius: isFullscreen ? "10px" : "0 0 10px 10px",
                        zIndex: 10,
                        opacity: showControls ? 1 : 0,
                        transition: "opacity 0.3s",
                    }}
                    onMouseMove={() => setShowControls(true)}
                >
                    <IconButton
                        onClick={() => turnOnMicrophone(!audioEnabled)}
                        style={{ color: "white" }}
                    >
                        {audioEnabled ? <Mic /> : <MicOff />}
                    </IconButton>
                    <IconButton
                        onClick={() => turnOnCamera(!isVideoEnabled)}
                        style={{ color: "white" }}
                    >
                        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                    <Tooltip title="Leave Call">
                        <IconButton onClick={endCall} style={{ color: "red" }}>
                            <CallEnd />
                        </IconButton>
                    </Tooltip>
                    <IconButton
                        onClick={toggleFullscreen}
                        style={{ color: "white" }}
                    >
                        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: 40,
                        bottom: -100,
                        px: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Button
                        LinkComponent={Link}
                        href="/dashboard/patient/appointments"
                        sx={{ borderRadius: "20px", border: "1px solid" }}
                        variant="outlined"
                    >
                        Back To Dashboard
                    </Button>
                    <Button
                        onClick={isJoined ? endCall : startCall}
                        sx={{ borderRadius: "20px" }}
                    >
                        {isJoined ? "End Call" : "Start Call"}
                    </Button>
                </Box>
            </Box>
        </Stack>
    );
};

export default VideoArea;
