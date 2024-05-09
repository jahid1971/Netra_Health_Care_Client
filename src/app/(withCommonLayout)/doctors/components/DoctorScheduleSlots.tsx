"use client";
import DashedLine from "@/components/ui/DashedLine";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { tryCatch } from "@/utils/tryCatch";
import ScheduleButtons from "./ScheduleButtons";
import { useMemo, useState } from "react";
import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { createAppointment } from "@/services/actions/appointment";
import { ISchedule } from "@/types/schedules";
import { initialPayment } from "@/services/actions/payment";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/SubmitButton";
import AppError from "@/utils/AppError";

import ScheduleButtonsSkeleton from "./ScheduleButtonsSkeleton";

const DoctorScheduleSlots = ({ doctorId }: { doctorId: string }) => {
    const [scheduleId, setScheduleID] = useState("");
    const router = useRouter();

    const todayQuery = useMemo(
        () => ({
            doctorId,
            startDate: dayjs().startOf("day").toISOString(), // Current date
            endDate: dayjs().endOf("day").toISOString(),
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
        }),
        [doctorId]
    );

    const { data: tomorrowSlots, isLoading: isTomorrowLoading } =
        useGetDoctorSchedulesQuery(tomorrowQuery);

    console.log(todaySlots, "todaySlots", tomorrowSlots, "tomorrowSlots");

    const handleBookAppointment = async () => {
        tryCatch(async () => {
            if (doctorId && scheduleId) {
                const res = await createAppointment({ doctorId, scheduleId });

                const id = res?.data?.id;
                console.log(res, "res");

                if (id) {
                    const response = await initialPayment(id);
                    console.log(response, "response of paymanet url");

                    if (response?.data?.paymentUrl) {
                        router.push(response?.data?.paymentUrl);
                    } else response;
                } else return res;
            } else
                throw new AppError("Select a schedule to book an appointment");
        }, "Processing your appointment");
    };

    return (
        <Box mt={2}>
            <Typography variant="h5" color={"primary.main"}>
                Availability
            </Typography>

            <Typography variant="h6" fontSize={15} fontWeight={600} mb={1}>
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

            <Typography variant="h6" fontSize={15} fontWeight={600} mb={1}>
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

            <SubmitButton
                onClick={handleBookAppointment}
                sx={{ mt: 2 }}
                label=" Book Appointment Now"
                fullWidth={false}
            />
        </Box>
    );
};

export default DoctorScheduleSlots;
