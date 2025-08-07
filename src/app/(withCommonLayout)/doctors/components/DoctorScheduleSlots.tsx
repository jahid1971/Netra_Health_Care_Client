"use client";
import DashedLine from "@/components/ui/DashedLine";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { tryCatch } from "@/utils/tryCatch";
import ScheduleButtons from "./ScheduleButtons";
import { useMemo, useState } from "react";
import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { createAppointment } from "@/services/actions/appointment";

import { useRouter } from "next/navigation";
import ScheduleButtonsSkeleton from "./ScheduleButtonsSkeleton";
import { toast } from "sonner";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DoctorScheduleSlots = ({
    doctorId,
    adminView,
}: {
    doctorId: string;
    adminView?: boolean;
}) => {
    const [scheduleId, setScheduleID] = useState("");
    const [pickedDate, setPickedDate] = useState<dayjs.Dayjs | null>(null);
    const router = useRouter();

    const todayQuery = useMemo(
        () => ({
            doctorId,
            startDate: dayjs().startOf("day").toISOString(),
            endDate: dayjs().endOf("day").toISOString(),
            limit: 100,
            isBooked: false,
        }),
        [doctorId]
    );

    const { data: todaySlots, isLoading: isTodayLoading } =
        useGetDoctorSchedulesQuery(todayQuery);

    const tomorrowQuery = useMemo(
        () => ({
            doctorId,
            startDate: dayjs().add(1, "day").startOf("day").toISOString(),
            endDate: dayjs().add(1, "day").endOf("day").toISOString(),
            limit: 100,
            isBooked: false,
        }),
        [doctorId]
    );

    const { data: tomorrowSlots, isLoading: isTomorrowLoading } =
        useGetDoctorSchedulesQuery(tomorrowQuery);

    // Calendar date query
    const calendarQuery = useMemo(() => {
        if (!pickedDate) return null;
        return {
            doctorId,
            startDate: pickedDate.startOf("day").toISOString(),
            endDate: pickedDate.endOf("day").toISOString(),
            limit: 100,
            isBooked: false,
        };
    }, [doctorId, pickedDate]);

    const { data: calendarSlots, isFetching: isCalendarLoading } =
        useGetDoctorSchedulesQuery(calendarQuery ?? {}, { skip: !pickedDate });

    const handleBookAppointment = async () => {
        if (doctorId && scheduleId) {
            tryCatch(async () => {
                const res = await createAppointment({ doctorId, scheduleId });

                const paymentUrl = res?.data?.paymentUrl;

                if (paymentUrl) {
                    router.push(paymentUrl);
                } else return res;
            }, "Processing your appointment");
        } else toast.error("Please select a schedule first");
    };

    return (
        <Box mt={2}>
            <Typography
                variant="h5"
                color={"primary.main"}
                textAlign={"center"}
                mb={2}
            >
                Availability
            </Typography>

            <Typography
                variant="h6"
                fontSize={15}
                fontWeight={600}
                mb={1}
                textAlign={"center"}
            >
                Today: {dayjs().format("MMMM D, YYYY, dddd")}
            </Typography>

            {isTodayLoading ? (
                <ScheduleButtonsSkeleton />
            ) : (
                <ScheduleButtons
                    setScheduleID={setScheduleID}
                    scheduleId={scheduleId}
                    doctorSchedules={todaySlots?.data ?? []}
                />
            )}

            <DashedLine />

            <Typography
                variant="h6"
                fontSize={15}
                fontWeight={600}
                mb={1}
                textAlign={"center"}
            >
                Tomrrow: {dayjs().add(1, "day").format("MMMM D, YYYY, dddd")}
            </Typography>

            {isTomorrowLoading ? (
                <ScheduleButtonsSkeleton />
            ) : (
                <ScheduleButtons
                    setScheduleID={setScheduleID}
                    scheduleId={scheduleId}
                    doctorSchedules={tomorrowSlots?.data ?? []}
                />
            )}

            {/* Calendar section */}
            <Box
                mt={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Pick a date "
                        value={pickedDate}
                        onChange={setPickedDate}
                        disablePast
                        slotProps={{
                            textField: {
                                size: "small",
                                fullWidth: false,
                                sx: {
                                    mt: 2,
                                    "& .MuiInputLabel-root": {
                                        color: "primary.main",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: "primary.main",
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
                {pickedDate && (
                    <Box width="100%" mt={2}>
                        <Typography
                            variant="h6"
                            fontSize={15}
                            fontWeight={600}
                            mb={1}
                            textAlign={"center"}
                        >
                            {pickedDate.format("MMMM D, YYYY, dddd")}
                        </Typography>
                        {isCalendarLoading ? (
                            <ScheduleButtonsSkeleton />
                        ) : (
                            <ScheduleButtons
                                setScheduleID={setScheduleID}
                                scheduleId={scheduleId}
                                doctorSchedules={calendarSlots?.data ?? []}
                            />
                        )}
                    </Box>
                )}
            </Box>

            {!adminView && (
                <Box display="flex" justifyContent="right" width="100%" >
                    <Button
                        onClick={handleBookAppointment}
                        sx={{ mt: 2 }}
                        fullWidth={false}
                    >
                        Book Appointment Now
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default DoctorScheduleSlots;
