import { baseUrl } from "@/constants/commmon";
import { io } from "socket.io-client";

const socket = io(baseUrl, {
    withCredentials: true,
    transports: ["websocket"],
});

export default socket;
