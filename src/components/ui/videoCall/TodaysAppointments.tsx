import { TAppointment } from "@/types/Appointment";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { Videocam } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import N_Chips from "../N_Chips";

const TodaysAppointments = ({
    appointments,
    currentAppointment,
}: {
    appointments: TAppointment[];
    currentAppointment: TAppointment;
}) => {
    return (
        <Box p={2}>
            <Typography
                variant="h6"
                fontWeight={600}
                color="primary.main"
                textAlign={"center"}
            >
                TODAY'S APPOINTMENTS
            </Typography>
            <Box sx={{ overflow: "auto" }}>
                {appointments?.map((appointment, index) => (
                    <Stack
                        key={appointment.id}
                        direction={"row"}
                        alignItems={"center"}
                        gap={1}
                        justifyContent={"space-between"}
                        sx={{
                            my: 1,
                            p: 2,
                            px: 5,
                            backgroundColor: blue[100],
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
