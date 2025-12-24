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
import SubmitButton from "@/components/ui/SubmitButton";
import AppError from "@/utils/AppError";

import ScheduleButtonsSkeleton from "./ScheduleButtonsSkeleton";
import { toast } from "sonner";

const DoctorScheduleSlots = ({ doctorId }: { doctorId: string }) => {
    const [scheduleId, setScheduleID] = useState("");
    const router = useRouter();

    const todayQuery = useMemo(
        () => ({
            doctorId,
            startDate: dayjs().startOf("day").toISOString(), // Current date
            endDate: dayjs().endOf("day").toISOString(),
            limit: 100, // as there is no pagination here
            isBooked: false,
        }),
        [doctorId]
    );

    const { data: todaySlots, isLoading: isTodayLoading } =
        useGetDoctorSchedulesQuery(todayQuery);

    const tomorrowQuery = useMemo(
        () => ({
            doctorId,
            startDate: dayjs().add(1, "day").startOf("day").toISOString(), // Tomorrow's date
            endDate: dayjs().add(1, "day").endOf("day").toISOString(),
            limit: 100,
            isBooked: false,
        }),
        [doctorId]
    );

    const { data: tomorrowSlots, isLoading: isTomorrowLoading } =
        useGetDoctorSchedulesQuery(tomorrowQuery);

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

            {/* <SubmitButton
                onClick={handleBookAppointment}
                sx={{ mt: 2 }}
                label=" Book Appointment Now"
                fullWidth={false}
            /> */}
            <Button
                onClick={handleBookAppointment}
                sx={{ mt: 2 }}
                fullWidth={false}
            >
                Book Appointment Now
            </Button>
        </Box>
    );
};

export default DoctorScheduleSlots;
