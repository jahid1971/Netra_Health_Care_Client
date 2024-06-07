"use client";
import { TAppointment } from "@/types/Appointment";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { Videocam } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import N_Chips from "../../N_Chips";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const TodaysAppointments = ({
    appointments,
    currentAppointment,
    isJoined,
}: {
    appointments: TAppointment[];
    currentAppointment: TAppointment;
    isJoined: boolean;
}) => {
    // const searchParams = useSearchParams();
    const router = useRouter();

    const handleVideoCallingIdChange = (videoCallingId: string) => {
        if (isJoined) return toast.error("Please end the current call first");
        
        const params = new URLSearchParams();
        params.set("videoCallingId", videoCallingId);
        router.push(`?${params.toString()}`);
    };
    return (
        <Box>
            <Typography
                variant="h6"
                fontWeight={600}
                color="primary.main"
                textAlign={"center"}
            >
                TODAY&apos;S APPOINTMENTS
            </Typography>
            <Box
                sx={{
                    overflow: "auto",
                    borderRadius: "10px",
                    p: 2,
                    mt: 2,
                    minHeight: "520px",
                    backgroundColor: "#F4F7FE",
                }}
            >
                {appointments?.map((appointment, index) => (
                    <Stack
                        component={Button}
                        onClick={() =>
                            handleVideoCallingIdChange(
                                appointment.videoCallingId
                            )
                        }
                        key={appointment.id}
                        direction={"row"}
                        alignItems={"center"}
                        gap={1}
                        justifyContent={"space-between"}
                        sx={{
                            my: 1,

                            px: 2,
                            backgroundColor:
                                currentAppointment?.videoCallingId ===
                                appointment?.videoCallingId
                                    ? blue[100]
                                    : grey[100],
                            width: "100%",
                            borderRadius: "10px",
                        }}
                    >
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                            <Typography>
                                {index + 1} {"."}{" "}
                            </Typography>
                            <Avatar
                                alt="patient"
                                src={appointment?.patient?.profilePhoto || ""}
                                sx={{
                                    width: 35,
                                    height: 35,
                                }}
                            />
                            <Typography key={appointment?.id}>
                                {appointment?.patient?.name}
                            </Typography>
                        </Stack>

                        <Typography>
                            {timeFormatter(
                                appointment?.schedule?.startDateTime
                            )}{" "}
                            -{" "}
                            {timeFormatter(appointment?.schedule?.endDateTime)}
                        </Typography>

                        <IconButton>
                            {currentAppointment?.videoCallingId ===
                            appointment?.videoCallingId ? (
                                <N_Chips label="Current" type="success" />
                            ) : (
                                <Videocam />
                            )}
                        </IconButton>
                    </Stack>
                ))}
            </Box>
        </Box>
    );
};

export default TodaysAppointments;
