// "use client"
// import React, { useRef, useState, useEffect } from "react";
// import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
// import {
//     CallEnd,
//     Fullscreen,
//     FullscreenExit,
//     Mic,
//     MicOff,
//     Videocam,
//     VideocamOff,
// } from "@mui/icons-material";
// import { blue } from "@mui/material/colors";
// import type {
//     ICameraVideoTrack,
//     IMicrophoneAudioTrack,
//     IAgoraRTCClient,
//     IAgoraRTCRemoteUser,
// } from "agora-rtc-sdk-ng";

// import {
//     VERSION,
//     createCameraVideoTrack,
//     createClient,
//     createMicrophoneAudioTrack,
//     onCameraChanged,
//     onMicrophoneChanged,
// } from "agora-rtc-sdk-ng/esm";

// const client: IAgoraRTCClient = createClient({
//     mode: "rtc",
//     codec: "vp8",
// });
// let audioTrack: IMicrophoneAudioTrack;
// let videoTrack: ICameraVideoTrack;

// function VideoArea({
//     videoCallingId,
//     startCall,
// }: {
//     videoCallingId: string;
//     startCall: boolean;
// }) {
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const [showControls, setShowControls] = useState(true);

//     const [isHovered, setIsHovered] = useState(false);

//     const [isAudioOn, setIsAudioOn] = useState(false);
//     const [isVideoOn, setIsVideoOn] = useState(false);
//     const [isAudioPubed, setIsAudioPubed] = useState(false);
//     const [isVideoPubed, setIsVideoPubed] = useState(false);
//     const [isVideoSubed, setIsVideoSubed] = useState(false);
//     const [isJoined, setIsJoined] = useState(false);

//     const channel = useRef("");
//     const appid = useRef("");
//     const token = useRef("");

//     const turnOnCamera = async (flag?: boolean) => {
//         flag = flag ?? !isVideoOn;
//         setIsVideoOn(flag);

//         if (videoTrack) {
//             return videoTrack?.setEnabled(flag);
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
//     };

//     const joinChannel = async () => {
//         if (!channel.current) {
//             channel.current = "react-room";
//         }

//         if (isJoined) {
//             await leaveChannel();
//         }

//         client.on("user-published", onUserPublish);

//         await client.join(
//             process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || appid.current,
//             videoCallingId,
//             token.current || null
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
//         const remoteTrack = await client.subscribe(user, mediaType);
//         if (mediaType === "video") {
//             remoteTrack.play("remote-video");
//             setIsVideoSubed(true);
//         } else if (mediaType === "audio") {
//             remoteTrack.play();
//         }
//     };

//     const publishVideo = async () => {
//         await turnOnCamera(true);
//         if (!isJoined) await joinChannel();
//         await client.publish(videoTrack);
//         setIsVideoPubed(true);
//     };

//     const publishAudio = async () => {
//         await turnOnMicrophone(true);
//         if (!isJoined) await joinChannel();
//         await client.publish(audioTrack);
//         setIsAudioPubed(true);
//     };

//     useEffect(() => {
//         if (startCall && !isJoined) {
//             publishVideo();
//             publishAudio();
//         }
//     }, [startCall]);

//     const endCall = async () => {
//         // Unpublish and stop video track
//         if (isVideoPubed && videoTrack) {
//             await client.unpublish(videoTrack);
//             videoTrack.stop();
//             videoTrack.close();
//             videoTrack = undefined; // Reset video track
//             setIsVideoPubed(false);
//         }

//         // Unpublish and stop audio track
//         if (isAudioPubed && audioTrack) {
//             await client.unpublish(audioTrack);
//             audioTrack.stop();
//             audioTrack.close();
//             audioTrack = undefined; // Reset audio track
//             setIsAudioPubed(false);
//         }

//         // Leave the channel
//         if (isJoined) {
//             await client.leave();
//             setIsJoined(false);
//         }

//         // Reset states
//         setIsAudioOn(false);
//         setIsVideoOn(false);
//         setIsVideoSubed(false);
//     };

//     const toggleMute = () => {
//         if (videoRef.current) {
//             videoRef.current.muted = !isMuted;
//             setIsMuted(!isMuted);
//         }
//     };

//     const toggleVideo = () => {
//         setIsVideoEnabled(!isVideoEnabled);
//     };

//     const enterFullscreen = () => {
//         if (videoContainerRef.current) {
//             if (videoContainerRef.current.requestFullscreen) {
//                 videoContainerRef.current.requestFullscreen();
//                 setIsFullscreen(true);
//                 showControlsTemporarily();
//             }
//         }
//     };

//     const exitFullscreen = () => {
//         if (document.fullscreenElement) {
//             document.exitFullscreen().then(() => {
//                 setIsFullscreen(false);
//                 setShowControls(false); // Hide controls when exiting fullscreen
//             });
//         }
//     };

//     const showControlsTemporarily = () => {
//         setShowControls(true);
//         setTimeout(() => {
//             setShowControls(false);
//         }, 4000); // Auto-hide controls after 5 seconds
//     };

//     // Show controls on hover
//     const handleMouseMove = () => {
//         setShowControls(true);
//         setTimeout(() => {
//             if (isHovered) return;
//             setShowControls(false);
//         }, 4000);
//     };

//     // Listen for fullscreen changes to hide controls when exiting fullscreen
//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             setIsFullscreen(!!document.fullscreenElement);
//             if (!document.fullscreenElement) {
//                 setShowControls(false);
//             }
//         };
//         document.addEventListener("fullscreenchange", handleFullscreenChange);
//         return () => {
//             document.removeEventListener(
//                 "fullscreenchange",
//                 handleFullscreenChange
//             );
//         };
//     }, []);

//     return (
//         <Stack>
//             <Box
//                 ref={videoContainerRef}
//                 sx={{
//                     position: "relative",
//                     width: "100%",
//                     height: "100%",
//                     border: "1px solid black",
//                     overflow: "hidden",
//                     backgroundColor: "#000",
//                 }}
//                 onMouseMove={isFullscreen ? handleMouseMove : undefined}
//             >
//                 <video
//                     ref={videoRef}
//                     id="camera-video"
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         display: isVideoEnabled ? "block" : "none",
//                     }}
//                     autoPlay
//                 ></video>
//                 {!isVideoEnabled && (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                             color: "white",
//                         }}
//                     >
//                         <p>Video Disabled</p>
//                     </Box>
//                 )}
//                 {/* Control Buttons */}
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         bottom: 10,
//                         left: 10,
//                         right: 10,
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         backgroundColor: blue[500],
//                         padding: "5px 10px",
//                         borderRadius: "10px",
//                         zIndex: 10,
//                         opacity: showControls ? 1 : 0, // Control visibility
//                         transition: "opacity 0.3s", // Smooth transition
//                         // pointerEvents: showControls ? "all" : "none", // Disable interactions when hidden
//                     }}
//                     onMouseMove={() => setShowControls(true)}
//                     onMouseEnter={() => {
//                         setShowControls(true);
//                         setIsHovered(true);
//                     }}
//                     onMouseLeave={() => {
//                         setShowControls(false);
//                         setIsHovered(false);
//                     }}
//                 >
//                     <IconButton onClick={toggleMute} style={{ color: "white" }}>
//                         {isMuted ? <MicOff /> : <Mic />}
//                     </IconButton>
//                     <IconButton
//                         onClick={toggleVideo}
//                         style={{ color: "white" }}
//                     >
//                         {isVideoEnabled ? <Videocam /> : <VideocamOff />}
//                     </IconButton>
//                     <Tooltip title="Leave Call">
//                         <IconButton style={{ color: "red" }}>
//                             <CallEnd />
//                         </IconButton>
//                     </Tooltip>
//                     <IconButton
//                         onClick={
//                             isFullscreen ? exitFullscreen : enterFullscreen
//                         }
//                         style={{ color: "white" }}
//                     >
//                         {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
//                     </IconButton>
//                 </Box>
//             </Box>
//             <Stack
//                 direction="row"
//                 spacing={2}
//                 justifyContent={"space-around"}
//                 my={2}
//             >
//                 <Button
//                     variant={isVideoOn ? "contained" : "outlined"}
//                     onClick={() => turnOnCamera()}
//                 >
//                     {isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
//                 </Button>
//                 <Button
//                     variant={isAudioOn ? "contained" : "outlined"}
//                     onClick={() => turnOnMicrophone()}
//                 >
//                     {isAudioOn ? "Turn Off Mic" : "Turn On Mic"}
//                 </Button>
//                 <Button onClick={enterFullscreen} variant="contained">
//                     FullScreen
//                 </Button>
//                 <Button variant="contained" onClick={endCall}>
//                     End Call
//                 </Button>
//             </Stack>
//         </Stack>
//     );
// }

// export default VideoArea;

// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
// import {
//     CallEnd,
//     Fullscreen,
//     FullscreenExit,
//     Mic,
//     MicOff,
//     Videocam,
//     VideocamOff,
// } from "@mui/icons-material";
// import { blue } from "@mui/material/colors";
// import type {
//     ICameraVideoTrack,
//     IMicrophoneAudioTrack,
//     IAgoraRTCClient,
//     IAgoraRTCRemoteUser,
// } from "agora-rtc-sdk-ng";
// import {
//     createCameraVideoTrack,
//     createClient,
//     createMicrophoneAudioTrack,
// } from "agora-rtc-sdk-ng/esm";

// const client: IAgoraRTCClient = createClient({
//     mode: "rtc",
//     codec: "vp8",
// });
// let audioTrack: IMicrophoneAudioTrack | null = null;
// let videoTrack: ICameraVideoTrack | null = null;

// const VideoArea = ({
//     videoCallingId,
//     videoCallUi,
// }: {
//     videoCallingId: string;
//     videoCallUi: boolean;
// }) => {
//     const videoContainerRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLVideoElement>(null);

//     const [audioEnabled, setAudioEnabled] = useState(false);
//     const [isVideoEnabled, setIsVideoEnabled] = useState(true);
//     const [isFullscreen, setIsFullscreen] = useState(false);
//     const [showControls, setShowControls] = useState(true);
//     const [isJoined, setIsJoined] = useState(false);
//     const [isAudioPubed, setIsAudioPubed] = useState(false);
//     const [isVideoPubed, setIsVideoPubed] = useState(false);

//     const appid = process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "";
//     const channel = videoCallingId;

//     const turnOnCamera = async (enabled: boolean = true) => {
//         setIsVideoEnabled(enabled);
//         if (enabled) {
//             if (!videoTrack) videoTrack = await createCameraVideoTrack();
//             videoTrack.setEnabled(true);
//             videoTrack.play("camera-video");
//         } else if (videoTrack) {
//             videoTrack.setEnabled(false);
//         }
//     };

//     const turnOnMicrophone = async (enabled: boolean = true) => {
//         setAudioEnabled(enabled);
//         if (enabled) {
//             if (!audioTrack) audioTrack = await createMicrophoneAudioTrack();
//             audioTrack.setEnabled(true);
//         } else if (audioTrack) {
//             audioTrack.setEnabled(false);
//         }
//     };

//     const joinChannel = async () => {
//         if (isJoined) return;

//         client.on("user-published", async (user, mediaType) => {
//             const remoteTrack = await client.subscribe(user, mediaType);
//             if (mediaType === "video") {
//                 remoteTrack.play("remote-video");
//             } else {
//                 remoteTrack.play();
//             }
//         });

//         await client.join(appid, channel, null);
//         setIsJoined(true);
//     };

//     const leaveChannel = async () => {
//         await client.leave();
//         setIsJoined(false);
//     };

//     const publishTrack = async (
//         track: IMicrophoneAudioTrack | ICameraVideoTrack,
//         setPublished: (value: boolean) => void
//     ) => {
//         if (!isJoined) await joinChannel();
//         await client.publish(track);
//         setPublished(true);
//     };

//     const unpublishTrack = async (
//         track: IMicrophoneAudioTrack | ICameraVideoTrack | null,
//         setPublished: (value: boolean) => void
//     ) => {
//         if (!isJoined) return;
//         if (track) {
//             await client.unpublish(track);
//             track.stop();
//             track.close();
//             setPublished(false);
//         }
//     };

//     const endCall = async () => {
//         await unpublishTrack(videoTrack, setIsVideoPubed);

//         await unpublishTrack(audioTrack, setIsAudioPubed);

//         await leaveChannel();
//         setIsVideoEnabled(false);
//         setAudioEnabled(false);
//         await turnOnCamera(false);
//         await turnOnMicrophone(false);

//         videoTrack = null;
//         audioTrack = null;
//     };

//     const toggleFullscreen = () => {
//         if (isFullscreen) {
//             document.exitFullscreen();
//         } else {
//             videoContainerRef.current?.requestFullscreen();
//         }
//         setIsFullscreen(!isFullscreen);
//     };

//     useEffect(() => {
//         if (videoCallUi) {
//             console.log(
//                 "videocalluI>>>>>>>>______________________________________"
//             );
//             turnOnCamera();
//             turnOnMicrophone();
//         }

//         // return () => {
//         //  endCall();
//         // };
//     }, [videoCallUi]);
//     useEffect(() => {
//         if (showControls) {
//             setTimeout(() => {
//                 setShowControls(false);
//             }, 4000);
//         }
//     }, [showControls]);

//     return (
//         <Stack>
//             <Box
//                 ref={videoContainerRef}
//                 sx={{
//                     position: "relative",
//                     width: "100%",
//                     height: "100%",
//                     border: "1px solid black",
//                     overflow: "hidden",
//                     backgroundColor: "#000",
//                     aspectRatio: "16/9",
//                 }}
//             >
//                 <video
//                     ref={videoRef}
//                     id="camera-video"
//                     style={{ width: "100%" }}
//                     autoPlay
//                 ></video>
//                 {!isVideoEnabled && (
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             height: "100%",
//                             color: "white",
//                         }}
//                     >
//                         Video Disabled
//                     </Box>
//                 )}

//                 {/* Control Buttons */}
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         bottom: 10,
//                         left: 10,
//                         right: 10,
//                         display: "flex",
//                         justifyContent: "space-between",
//                         backgroundColor: blue[500],
//                         padding: "5px 10px",
//                         borderRadius: "10px",
//                         zIndex: 10,
//                         opacity: showControls ? 1 : 0,
//                         transition: "opacity 0.3s",
//                     }}
//                     onMouseMove={() => setShowControls(true)}
//                     onMouseEnter={() => setShowControls(true)}
//                     onMouseLeave={() => setShowControls(false)}
//                 >
//                     <IconButton
//                         onClick={() => turnOnMicrophone(!audioEnabled)}
//                         style={{ color: "white" }}
//                     >
//                         {audioEnabled ? <Mic /> : <MicOff />}
//                     </IconButton>
//                     <IconButton
//                         onClick={() => turnOnCamera(!isVideoEnabled)}
//                         style={{ color: "white" }}
//                     >
//                         {isVideoEnabled ? <Videocam /> : <VideocamOff />}
//                     </IconButton>
//                     <Tooltip title="Leave Call">
//                         <IconButton onClick={endCall} style={{ color: "red" }}>
//                             <CallEnd />
//                         </IconButton>
//                     </Tooltip>
//                     <IconButton
//                         onClick={toggleFullscreen}
//                         style={{ color: "white" }}
//                     >
//                         {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
//                     </IconButton>
//                 </Box>
//             </Box>
//             <Stack
//                 direction="row"
//                 spacing={2}
//                 justifyContent="space-around"
//                 my={2}
//             >
//                 <Button
//                     variant={isVideoPubed ? "contained" : "outlined"}
//                     onClick={() => publishTrack(videoTrack, setIsVideoPubed)}
//                 >
//                     {isVideoPubed ? "Stop Video" : "Start Video"}
//                 </Button>
//                 <Button
//                     variant={isAudioPubed ? "contained" : "outlined"}
//                     onClick={() => publishTrack(audioTrack, setIsAudioPubed)}
//                 >
//                     {isAudioPubed ? "Stop Audio" : "Start Audio"}
//                 </Button>
//                 <Button onClick={toggleFullscreen} variant="contained">
//                     FullScreen
//                 </Button>
//                 <Button variant="contained" onClick={endCall} color="error">
//                     End Call
//                 </Button>
//             </Stack>
//         </Stack>
//     );
// };

// export default VideoArea;

"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
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

const client: IAgoraRTCClient = createClient({
    mode: "rtc",
    codec: "vp8",
});

let audioTrack: IMicrophoneAudioTrack | null = null;
let videoTrack: ICameraVideoTrack | null = null;

const VideoArea = ({
    videoCallingId,
    videoCallUi,
}: {
    videoCallingId: string;
    videoCallUi: boolean;
}) => {
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser>(null);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [isVideoEnabled, setIsVideoEnabled] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [isAudioPubed, setIsAudioPubed] = useState(false);
    const [isVideoPubed, setIsVideoPubed] = useState(false);

    const appid = process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "";
    const channel = videoCallingId;

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
            setRemoteUsers(user);
            console.log(
                user,
                "user_________________________________user________________________"
            );

            // if (mediaType === "video") {
            //     user?.videoTrack?.play(`remote-video`);
            // } else if (mediaType === "audio") {
            //     user?.audioTrack?.play();
            // }
        });

        // client.on("user-unpublished", (user) => {
        //     setRemoteUsers((prevUsers) =>
        //         prevUsers.filter((u) => u.uid !== user.uid)
        //     );
        //     setRemoteUsers(user);
        // });

        await client.join(appid, channel, null);
        setIsJoined(true);
    };

    const leaveChannel = async () => {
        await client.leave();
        setRemoteUsers([]);
        setIsJoined(false);
    };

    // const publishTrack = async (
    //     track: IMicrophoneAudioTrack | ICameraVideoTrack,
    //     setPublished: (value: boolean) => void
    // ) => {
    //     if (!isJoined) await joinChannel();
    //     await client.publish(track);
    //     setPublished(true);
    // };

    const startCall = async () => {
        try {
            if (!isJoined) {
                await joinChannel(); // Ensure the client is joined to the channel first
            }

            // Create and publish audio track
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
                {/* Local User Video */}
                <video
                    ref={videoRef}
                    id={isJoined ? "remote-video" : "camera-video"}
                    style={{ width: "100%", height: "100%" }}
                    autoPlay
                ></video>
                {!isVideoEnabled && (
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
                )}

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
