"use client";

import React, { useEffect, useRef, useState } from "react";
import socket from "@/utils/socket";
import {
    useGetMessagesQuery,
    useUpdateMessageMutation,
    useUploadFileMsgMutation,
} from "@/redux/api/chatApi";
import { USER_ROLE } from "@/constants/role";
import { TAppointment } from "@/types/Appointment";
import { TChatMessage, TUser } from "@/types/common";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DashedLine from "../DashedLine";
import { blue, grey } from "@mui/material/colors";
import { useAppDispatch } from "@/redux/hooks";
import { setCountUnread } from "@/redux/slices/generalSlices";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import Image from "next/image";
import ImageViewer from "react-simple-image-viewer";
import { useIsSmallScreen } from "@/utils/isSmallScreen";

const ChatBox = ({
    currentAppointment,
    userData,
}: {
    currentAppointment: TAppointment;
    userData: TUser;
}) => {
    const dispatch = useAppDispatch();
    const [messages, setMessages] = useState<TChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentImage, setCurrentImage] = useState("");

    const isSmallScreen = useIsSmallScreen();

    const msgsBoxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (msgsBoxRef.current) {
            msgsBoxRef.current.scrollTop = msgsBoxRef.current.scrollHeight;
        }
    }, [messages]);

    let userId;
    let receiverId;

    if (userData?.role === USER_ROLE.DOCTOR) {
        userId = userData?.doctorId;
        receiverId = currentAppointment?.patient?.id;
    } else {
        userId = userData?.patientId;
        receiverId = currentAppointment?.doctor?.id;
    }

    const { data, refetch } = useGetMessagesQuery({
        id: userId,
        id_2: receiverId,
    });
    useEffect(() => {
        //to force refetch when mount and give fresh data
        refetch();
    }, [refetch]);

    const [updateMessage] = useUpdateMessageMutation();

    const [uploadFileMsg] = useUploadFileMsgMutation();

    useEffect(() => {
        if (data?.data) {
            setMessages(data?.data);
        }
    }, [data]);

    // Join room on mount
    useEffect(() => {
        socket.emit("join_room", userId);

        // Listen for incoming messages
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [userId]);

    // Send message
    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const messageData: TChatMessage = {
            senderId: userId as string,
            receiverId: receiverId as string,
            message: newMessage,
        };

        socket.emit("send_message", messageData);
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
    };

    const handleUpload = (file: File) => {
        const payload = {
            senderId: userId,
            receiverId: receiverId,
            file: file,
        };

        const modifiedPayload = modifyPayload(payload);

        uploadFileMsg(modifiedPayload);
    };

    useEffect(() => {
        const markMessagesAsRead = async () => {
            for (const msg of messages) {
                if (!msg.read && msg.receiverId === userId) {
                    try {
                        const result = await updateMessage({
                            id: msg.id,
                            data: { read: true },
                        }).unwrap();

                        dispatch(
                            setCountUnread((result?.data as any)?.unreadCount)
                        );
                    } catch (error) {
                        console.error("Failed to update message:", error);
                    }
                }
            }
        };

        markMessagesAsRead();
    }, [messages, userId, updateMessage, dispatch]);

    return (
        <Box
            ref={msgsBoxRef}
            sx={{ height: "100%", overflowY: "scroll" }}
            position="relative"
        >
            {!isSmallScreen && (
                <Box>
                    {" "}
                    <Typography
                        textAlign={"center"}
                        fontSize={20}
                        fontWeight={600}
                        color={blue[600]}
                    >
                        Chat With{" "}
                        {userData?.role === USER_ROLE.DOCTOR
                            ? "Patient"
                            : "Doctor"}
                    </Typography>
                    <DashedLine my={1} />
                </Box>
            )}
            <Stack
                direction={"column"}
                spacing={{ md: 2 }}
                justifyContent={"space-between"}
                minHeight={"500px"}
            >
                <Box
                    // height={"80%"}
                    display={"flex"}
                    flexDirection={"column"}
                    p={2}
                >
                    {messages.map((msg, index) => {
                        return (
                            <Box
                                key={index}
                                maxWidth={"80%"}
                                alignSelf={
                                    msg?.senderId === userId
                                        ? "flex-end"
                                        : "flex-start"
                                }
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                                my={"2px"}
                            >
                                <Typography
                                    display={"inline"}
                                    variant="body1"
                                    fontWeight={600}
                                    color={grey[600]}
                                >
                                    {msg?.senderId === userId
                                        ? "You"
                                        : userData?.role === USER_ROLE.DOCTOR
                                        ? "Patient"
                                        : "Doctor"}
                                    {":"}
                                </Typography>

                                {msg?.type === "image" ? (
                                    <Box
                                        component={"button"}
                                        sx={{ cursor: "pointer" }}
                                        onClick={() =>
                                            setCurrentImage(msg?.message)
                                        }
                                    >
                                        {" "}
                                        <Image
                                            alt="image"
                                            src={msg?.message}
                                            width={100}
                                            height={100}
                                        />
                                    </Box>
                                ) : (
                                    <Box
                                        sx={
                                            msg?.senderId === userId
                                                ? { backgroundColor: blue[100] }
                                                : { backgroundColor: grey[100] }
                                        }
                                        p={1}
                                        borderRadius={2}
                                    >
                                        <Typography display={"inline"}>
                                            {" "}
                                            {msg?.message}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
                <Box
                    p={1}
                    position={"sticky"}
                    bottom={0}
                    sx={{ backgroundColor: "white" }}
                >
                    <Box display={"flex"}>
                        <TextField
                            label="write message..."
                            variant="standard"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="write message..."
                        />
                        <Box>
                            {" "}
                            <Button onClick={sendMessage}>Send</Button>
                        </Box>
                    </Box>
                    <Box mt={1}>
                        <AutoFileUploader
                            name="file"
                            size="small"
                            label={"send image"}
                            fullWidth={false}
                            onFileUpload={handleUpload}
                        />

                        {userData?.role !== USER_ROLE.DOCTOR && (
                            <Typography display={"inline"} fontSize={"12px"}>
                                {" "}
                                (reports/ previous prescriptions)
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Stack>

            {currentImage && (
                <ImageViewer
                    src={[currentImage]}
                    //   currentIndex={ currentImage }
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={() => setCurrentImage("")}
                />
            )}
        </Box>
    );
};

export default ChatBox;
