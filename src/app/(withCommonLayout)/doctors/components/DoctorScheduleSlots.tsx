"use client";
import DashedLine from "@/components/ui/DashedLine";
import { Box, Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { tryCatch } from "@/utils/tryCatch";
import ScheduleButtons from "./ScheduleButtons";
import { useState } from "react";
import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { createAppointment } from "@/services/actions/appointment";
import { ISchedule } from "@/types/schedules";
import { initialPayment } from "@/services/actions/payment";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/SubmitButton";
import AppError from "@/utils/AppError";

const DoctorScheduleSlots = ({ doctorId }) => {
    const [scheduleId, setScheduleID] = useState("");
    const router = useRouter();

    const { data } = useGetDoctorSchedulesQuery({ doctorId: doctorId });

    const doctorSchedules: ISchedule[] = (data as any)?.data;

    const todaySlots = doctorSchedules?.filter((slot) => {
        return dayjs(slot?.schedule?.startDate).isSame(dayjs(), "day");
    });

    const tomorrowSlots = doctorSchedules?.filter((slot) => {
        return dayjs(slot?.schedule?.startDate).isSame(
            dayjs().add(1, "day"),
            "day"
        );
    });

    const handleBookAppointment = async () => {
        tryCatch(async () => {
            if (doctorId && scheduleId) {
                const res = await createAppointment({ doctorId, scheduleId });

                const id = res?.data?.id;
                console.log(res, "res");

                if (id) {
                    const response = await initialPayment(id);
                    console.log(response, "response");

                    if (response?.data?.paymentUrl) {
                        router.push(response?.data?.paymentUrl);
                    }
                }
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

            <ScheduleButtons
                setScheduleID={setScheduleID}
                scheduleId={scheduleId}
                doctorSchedules={todaySlots}
            />

            <DashedLine />

            <Typography variant="h6" fontSize={15} fontWeight={600} mb={1}>
                Tomrrow: {dayjs().add(1, "day").format("MMMM D, YYYY, dddd")}
            </Typography>

            <ScheduleButtons
                setScheduleID={setScheduleID}
                scheduleId={scheduleId}
                doctorSchedules={tomorrowSlots}
            />

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
