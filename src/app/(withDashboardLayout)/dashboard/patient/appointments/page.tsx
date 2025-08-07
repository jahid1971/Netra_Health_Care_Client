"use client";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    Stack,
    Button,
} from "@mui/material";
import { useState } from "react";
import N_Pagination from "@/components/pagination/Pagination";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import { TAppointment } from "@/types/Appointment";

const PatientAppoinmtntPage = () => {
    const [query, setQuery] = useState<Record<string, any>>({});
    const { data, isFetching } = useGetAllAppointmentsQuery(query);
    const appointments: TAppointment[] = data?.data || [];

    return (
        <Box sx={{ px: { xs: 1, sm: 2, md: 4 }, py: 2 }}>
            <Typography
                variant="h4"
                fontWeight={700}
                mb={2}
                color="primary.main"
            >
                My Appointments
            </Typography>
            <Paper
                elevation={2}
                sx={{
                    borderRadius: 3,
                    p: { xs: 1, sm: 2 },
                    mb: 2,
                    background: "#fafbfc",
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    mb={2}
                    color="text.secondary"
                >
                    Upcoming and past appointments
                </Typography>
                <Stack spacing={2}>
                    {isFetching ? (
                        <Typography>Loading...</Typography>
                    ) : appointments.length === 0 ? (
                        <Typography color="text.secondary">
                            No appointments found.
                        </Typography>
                    ) : (
                        appointments.map((appointment) => (
                            <Paper
                                key={appointment.id}
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: { sm: "center" },
                                    justifyContent: "space-between",
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    gap: 2,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={
                                            appointment?.doctor?.profilePhoto ||
                                            ""
                                        }
                                        alt={
                                            appointment?.doctor?.name ||
                                            "Doctor"
                                        }
                                    />
                                    <Box>
                                        <Typography
                                            fontWeight={600}
                                            fontSize={16}
                                        >
                                            {appointment?.doctor?.name ||
                                                "Doctor"}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            fontSize={14}
                                        >
                                            {dateFaormatter(
                                                appointment?.schedule
                                                    ?.startDateTime
                                            ) || "-"}
                                            {" | "}
                                            {timeFormatter(
                                                appointment?.schedule
                                                    ?.startDateTime
                                            ) || "-"}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Chip
                                        label={
                                            appointment?.paymentStatus ===
                                            "PAID"
                                                ? "Paid"
                                                : "Unpaid"
                                        }
                                        color={
                                            appointment?.paymentStatus ===
                                            "PAID"
                                                ? "success"
                                                : "error"
                                        }
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={appointment?.status || "-"}
                                        color={
                                            appointment?.status === "COMPLETED"
                                                ? "success"
                                                : appointment?.status ===
                                                  "CANCELLED"
                                                ? "error"
                                                : "info"
                                        }
                                        variant="outlined"
                                    />
                                    {appointment?.paymentStatus === "PAID" ? (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            href={`/video?videoCallingId=${appointment?.videoCallingId}`}
                                            startIcon={<VideocamIcon />}
                                        >
                                            Join
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            size="small"
                                            disabled
                                        >
                                            Payment Required
                                        </Button>
                                    )}
                                </Stack>
                            </Paper>
                        ))
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default PatientAppoinmtntPage;
