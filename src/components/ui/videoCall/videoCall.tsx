"use client";

// import React, { useContext, useState } from "react";
// import AgoraUIKit, { RtcContext } from "agora-react-uikit";
// import { Button, Stack } from "@mui/material";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import AgoraRTC from "agora-rtc-sdk-ng";

// const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
//     const [startVideoCall, setStartVideoCall] = useState(false);
//     const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

//     const router = useRouter();

//     const rtcProps = {
//         appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "test",
//         channel: videoCallingId, // your agora channel
//         token: null, // use null or skip if using app in testing mode

//     };

//     const callbacks = {
//         EndCall: () => {
//             setStartVideoCall(false);
//             router.push("/dashboard");

//         },
//     };

//     return startVideoCall ? (
//         <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//             <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
//         </div>
//     ) : (
//         <Stack
//             sx={{
//                 width: "100%",
//                 maxWidth: 500,
//                 mx: "auto",
//                 mt: { xs: 2, md: 10 },
//             }}
//             direction="column"
//             alignItems="center"
//             justifyContent="center"
//             gap={2}
//         >
//             <Image
//                 src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
//                 width={300}
//                 height={300}
//                 alt="video call gif"
//             />
//             <Button
//                 onClick={() => setStartVideoCall(true)}
//                 endIcon={<VideoCallIcon />}
//                 sx={{ borderRadius: "20px" }}
//             >
//                 Start Call
//             </Button>

//             <Button
//                 sx={{ borderRadius: "20px" }}
//                 LinkComponent={Link}
//                 href="/dashboard/patient/appointments"
//             >
//                 Back to Dashboard
//             </Button>
//         </Stack>
//     );
// };

// export default VideoCall;

// import React, { useState, useEffect } from "react";
// import AgoraUIKit, { RemoteVideoMute } from "agora-react-uikit";
// import { Button, Stack } from "@mui/material";
// import VideoCallIcon from "@mui/icons-material/VideoCall";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import AgoraRTC, { ILocalTrack } from "agora-rtc-sdk-ng"; // Import Agora SDK
// import { createCameraVideoTrack } from "agora-rtc-sdk-ng/esm";

// const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
//     const [startVideoCall, setStartVideoCall] = useState(false);
//     const router = useRouter();

//     // Agora RTC client and tracks
//     const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     let localAudioTrack: ILocalTrack | null = null;
//     let localVideoTrack: ILocalTrack | null = null;

//     const rtcProps = {
//         appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "test",
//         channel: videoCallingId, // your agora channel
//         token: null, // use null or skip if using app in testing mode
//     };

//     let videoTrack;

//     const initializeTracks = async () => {
//         try {
//             // Create audio and video tracks
//             [localAudioTrack, localVideoTrack] =
//                 await AgoraRTC.createMicrophoneAndCameraTracks();
//             // Publish tracks to the channel
//             await client.join(rtcProps.appId, rtcProps.channel, rtcProps.token);
//             await client.publish([localAudioTrack, localVideoTrack]);

//             videoTrack.setEnabled(true);
//             videoTrack = await createCameraVideoTrack();
//             videoTrack.play("local-video");
//             console.log("Tracks published successfully");
//         } catch (error) {
//             console.error("Error initializing tracks:", error);
//         }
//     };

//     const callbacks = {
//         EndCall: async () => {
//             // Leave the channel and clean up resources

//             console.log(localVideoTrack, "localVideoTrack___in end call");
//             if (localAudioTrack) {
//                 localAudioTrack.close();
//                 localAudioTrack.stop();
//                 localAudioTrack = null;
//             }
//             if (localVideoTrack) {
//                 localVideoTrack.setEnabled(false);
//                 localVideoTrack.close();
//                 localVideoTrack.stop();
//                 localVideoTrack = null;
//                 await videoTrack.setEnabled(false);
//             }
//             await client.leave();
//             console.log("Client left the channel and tracks stopped");
//             setStartVideoCall(false);
//             // router.push("/dashboard");
//         },
//     };

//     useEffect(() => {
//         if (startVideoCall) {
//             initializeTracks();
//         }

//         console.log(localVideoTrack, "localVideoTrack___in unmount");

//         // return () => {
//         //     // Cleanup on component unmount
//         //     console.log(localVideoTrack, "localVideoTrack___in unmount");
//         //     if (localAudioTrack) {
//         //         localAudioTrack.stop();
//         //         localAudioTrack.close();
//         //     }
//         //     if (localVideoTrack) {
//         //         localVideoTrack.stop();
//         //         localVideoTrack.close();

//         //         console.log(
//         //             "Client left the channel on unmount______________________________________________________________________________________________________________________"
//         //         );
//         //     }
//         //     client.leave().then(() => {});
//         // };
//     }, [startVideoCall]);

//     return startVideoCall ? (
//         <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//             <AgoraUIKit
//                 rtcProps={{ ...rtcProps }}
//                 callbacks={{
//                     ...callbacks,
//                     EndCall: callbacks.EndCall,
//                     "user-left": callbacks.EndCall,
//                     "leave-channel": callbacks.EndCall,
//                     "volume-indicator": (evt) => {
//                         console.log("Volume Indicator: ", evt);
//                     },
//                 }}
//
//             />
//         </div>
//     ) : (
//         <Stack
//             sx={{
//                 width: "100%",
//                 maxWidth: 500,
//                 mx: "auto",
//                 mt: { xs: 2, md: 10 },
//             }}
//             direction="column"
//             alignItems="center"
//             justifyContent="center"
//             gap={2}
//         >
//             <Image
//                 src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
//                 width={300}
//                 height={300}
//                 alt="video call gif"
//             />
//             <Button
//                 onClick={() => setStartVideoCall(true)}
//                 endIcon={<VideoCallIcon />}
//                 sx={{ borderRadius: "20px" }}
//             >
//                 Start Call
//             </Button>

//             <Button
//                 sx={{ borderRadius: "20px" }}
//                 LinkComponent={Link}
//                 href="/dashboard"
//             >
//                 Back to Dashboard
//             </Button>
//         </Stack>
//     );
// };

// export default VideoCall;

// import { useRef, useState } from "react";
// import "./videoCall.css";

// import type {
//     ICameraVideoTrack,
//     IMicrophoneAudioTrack,
//     IAgoraRTCClient,
//     IAgoraRTCRemoteUser,
// } from "agora-rtc-sdk-ng/esm";

// import {
//     VERSION,
//     createClient,
//     createCameraVideoTrack,
//     createMicrophoneAudioTrack,
//     onCameraChanged,
//     onMicrophoneChanged,
// } from "agora-rtc-sdk-ng/esm";

// console.log("Current SDK VERSION: ", VERSION);

// onCameraChanged((device) => {
//     console.log("onCameraChanged: ", device);
// });
// onMicrophoneChanged((device) => {
//     console.log("onMicrophoneChanged: ", device);
// });

// const client: IAgoraRTCClient = createClient({
//     mode: "rtc",
//     codec: "vp8",
// });
// let audioTrack: IMicrophoneAudioTrack;
// let videoTrack: ICameraVideoTrack;

// function VideoCall({ videoCallingId }: { videoCallingId: string }) {
//     const [isAudioOn, setIsAudioOn] = useState(false);
//     const [isVideoOn, setIsVideoOn] = useState(false);
//     const [isAudioPubed, setIsAudioPubed] = useState(false);
//     const [isVideoPubed, setIsVideoPubed] = useState(false);
//     const [isVideoSubed, setIsVideoSubed] = useState(false);

//     const turnOnCamera = async (flag?: boolean) => {
//         flag = flag ?? !isVideoOn;
//         setIsVideoOn(flag);

//         if (videoTrack) {
//             return videoTrack.setEnabled(flag);
//         }
//         videoTrack = await createCameraVideoTrack();
//         videoTrack.play("camera-video");
//     };

//     const turnOnMicrophone = async (flag?: boolean) => {
//         flag = flag ?? !isAudioOn;
//         setIsAudioOn(flag);

//         if (audioTrack) {
//             return audioTrack.setEnabled(flag);
//         }

//         audioTrack = await createMicrophoneAudioTrack();
//         // audioTrack.play();
//     };

//     const [isJoined, setIsJoined] = useState(false);
//     const channel = useRef("");
//     // you can apply appid follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
//     const appid = useRef("");
//     // you can apply token follow the guide https://www.agora.io/en/blog/how-to-get-started-with-agora/
//     const token = useRef("");

//     const joinChannel = async () => {
//         if (!channel.current) {
//             channel.current = "react-room";
//         }

//         if (isJoined) {
//             await leaveChannel();
//         }

//         client.on("user-published", onUserPublish);

//         await client.join(
//             process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "test",
//             videoCallingId,
//             null, //token
//             null
//         );
//         setIsJoined(true);
//     };

//     const leaveChannel = async () => {
//         setIsJoined(false);
//         setIsAudioPubed(false);
//         setIsVideoPubed(false);

//         await client.leave();
//     };

//     const onUserPublish = async (
//         user: IAgoraRTCRemoteUser,
//         mediaType: "video" | "audio"
//     ) => {
//         if (mediaType === "video") {
//             const remoteTrack = await client.subscribe(user, mediaType);
//             remoteTrack.play("remote-video");
//             setIsVideoSubed(true);
//         }
//         if (mediaType === "audio") {
//             const remoteTrack = await client.subscribe(user, mediaType);
//             remoteTrack.play();
//         }
//     };

//     const publishVideo = async () => {
//         await turnOnCamera(true);

//         if (!isJoined) {
//             await joinChannel();
//         }
//         await client.publish(videoTrack);
//         setIsVideoPubed(true);
//     };

//     const publishAudio = async () => {
//         await turnOnMicrophone(true);

//         if (!isJoined) {
//             await joinChannel();
//         }

//         await client.publish(audioTrack);
//         setIsAudioPubed(true);
//     };

//     return (
//         <>
//             <div className="left-side">
//                 <h3>Pleat check you camera / microphone!</h3>
//                 <div className="buttons">
//                     <button
//                         onClick={() => turnOnCamera()}
//                         className={isVideoOn ? "button-on" : ""}
//                     >
//                         Turn {isVideoOn ? "off" : "on"} camera
//                     </button>
//                     <button
//                         onClick={() => turnOnMicrophone()}
//                         className={isAudioOn ? "button-on" : ""}
//                     >
//                         Turn {isAudioOn ? "off" : "on"} Microphone
//                     </button>
//                 </div>
//                 <h3>
//                     {`Please input the appid and token (`}
//                     <a href="https://www.agora.io/en/blog/how-to-get-started-with-agora">
//                         Create an account.
//                     </a>
//                     {`) `}
//                 </h3>
//                 <input
//                     defaultValue={appid.current}
//                     placeholder="appid"
//                     onChange={(e) => (appid.current = e.target.value)}
//                 />
//                 <input
//                     defaultValue={token.current}
//                     placeholder="token"
//                     onChange={(e) => (token.current = e.target.value)}
//                 />
//                 <h3>Please input the channel name</h3>
//                 <input
//                     defaultValue={channel.current}
//                     onChange={(e) => (channel.current = e.target.value)}
//                 />
//                 <div className="buttons">
//                     <button
//                         onClick={joinChannel}
//                         className={isJoined ? "button-on" : ""}
//                     >
//                         Join Channel
//                     </button>
//                     <button
//                         onClick={publishVideo}
//                         className={isVideoPubed ? "button-on" : ""}
//                     >
//                         Publish Video
//                     </button>
//                     <button
//                         onClick={publishAudio}
//                         className={isAudioPubed ? "button-on" : ""}
//                     >
//                         Publish Audio
//                     </button>
//                     <button onClick={leaveChannel}>Leave Channel</button>
//                 </div>
//             </div>
//             <div className="right-side">
//                 <video
//                     id="camera-video"
//                     hidden={isVideoOn ? false : true}
//                 ></video>
//                 <video
//                     id="remote-video"
//                     hidden={isVideoSubed ? false : true}
//                 ></video>
//                 {isJoined && !isVideoSubed ? (
//                     <div className="waiting">
//                         You can shared channel {channel.current} to others.....
//                     </div>
//                 ) : null}
//             </div>
//         </>
//     );
// }

// export default VideoCall;

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
import { blue, red } from "@mui/material/colors";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/slices/authSlice";
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

    const user = useAppSelector(selectUser);
    const channel = useRef("");
    const appid = useRef("");
    const token = useRef("");

    const { data } = useGetMyAppointmentQuery(undefined);

    const appointments = data?.data;

    return (
        <Box
            sx={{
                px: 3,
                display: "flex",
                gap: 5,
                justifyContent: "space-between",
                // height: "100%",
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
                <Stack direction="row" spacing={5} width={"100%"} px={2} mt={5}>
                    <Stack sx={{ width: "70%" }}>
                        <VideoArea
                            videoCallUi={videoCallUi}
                            videoCallingId={videoCallingId}
                        />

                        {/* <Stack
                        direction="row"
                        spacing={2}
                        justifyContent={"space-around"}
                        my={2}
                    >
                        <Button
                            variant={isVideoOn ? "contained" : "outlined"}
                            onClick={() => turnOnCamera()}
                        >
                            {isVideoOn
                                ? "Turn Off Camera"
                                : "Turn On Camera"}
                        </Button>
                        <Button
                            variant={isAudioOn ? "contained" : "outlined"}
                            onClick={() => turnOnMicrophone()}
                        >
                            {isAudioOn ? "Turn Off Mic" : "Turn On Mic"}
                        </Button>
                        <Button variant="contained" >
                           FullScreen
                        </Button>
                        <Button variant="contained" onClick={endCall}>
                            End Call
                        </Button>
                    </Stack> */}
                    </Stack>
                    <Box
                        sx={{
                            width: "30%",
                            maxHeight: "450px",
                            overflow: "auto",
                            backgroundColor: "secondary.main",
                            p: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            color="primary.main"
                            textAlign={"center"}
                        >
                            Appointments
                        </Typography>
                        <Box sx={{ overflow: "auto" }}>
                            {appointments?.map((appointment, index) => (
                                <Stack
                                    key={appointment.id}
                                    direction={"row"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={{
                                        my: 1,
                                        p: 2,
                                        backgroundColor: blue[100],
                                        width: "100%",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <Typography>
                                        {index + 1} {"."}{" "}
                                    </Typography>
                                    <Avatar
                                        alt="patient"
                                        src={
                                            appointment?.patient
                                                ?.profilePhoto || ""
                                        }
                                        sx={{
                                            width: 35,
                                            height: 35,
                                        }}
                                    />
                                    <Typography key={appointment?.id}>
                                        {appointment?.patient?.name}
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                    </Box>
                </Stack>
                {/* <Box
                id="remote-video"
                sx={{
                    width: "100%",
                    height: "250px",
                    backgroundColor: "#f0f0f0",
                    display: isVideoSubed ? "block" : "none",
                }}
            ></Box> */}
                {!isVideoSubed && isJoined && (
                    <Typography color="textSecondary">
                        Share the channel name <b>{channel.current}</b> with
                        others to join.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default VideoCall;

// : (
//     <Stack
//         sx={{
//             width: "100%",
//             maxWidth: 500,
//             mx: "auto",
//             mt: { xs: 2, md: 10 },
//         }}
//         direction="column"
//         alignItems="center"
//         justifyContent="center"
//         gap={2}
//     >
//         <Image
//             src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
//             width={300}
//             height={300}
//             alt="video call gif"
//         />
//         <Button
//             onClick={() => setVideoCallUi(true)}
//             endIcon={<VideoCallIcon />}
//             sx={{ borderRadius: "20px" }}
//         >
//             Start Call
//         </Button>

//         <Button
//             sx={{ borderRadius: "20px" }}
//             LinkComponent={Link}
//             href="/dashboard/patient/appointments"
//         >
//             Back to Dashboard
//         </Button>
//     </Stack>
// );
