"use client";
import { useCountUnreadQuery } from "@/redux/api/chatApi";
import { Badge } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { USER_ROLE } from "@/constants/role";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import {
    setCountUnread,
    useSelectCountUnread,
} from "@/redux/slices/generalSlices";
import socket from "@/utils/socket";

const MessageIcon = ({ userData, currentAppointment }: any) => {
    const dispatch = useAppDispatch();

    const countUnread = useSelectCountUnread();
    const userId =
        userData?.role === USER_ROLE.DOCTOR
            ? userData?.doctorId
            : userData?.patientId;
    const senderId =
        userData?.role === USER_ROLE.DOCTOR
            ? currentAppointment?.patient?.id
            : currentAppointment?.doctor?.id;

    const { data } = useCountUnreadQuery({ userId, senderId });

    useEffect(() => {
        if (data) {
            dispatch(setCountUnread(data.data));
        }
    }, [data,dispatch]);

    useEffect(() => {
        socket.emit("join_room", userId);

        socket.on("count_unread", (data) => {
            dispatch(setCountUnread(data));
            console.log("count_unread-----------", data);
        });

        return () => {
            socket.off("count_unread");
        };
    }, [userId, dispatch]);


    return (
        <Badge badgeContent={countUnread} color="error">
            <EmailIcon />
        </Badge>
    );
};

export default MessageIcon;
