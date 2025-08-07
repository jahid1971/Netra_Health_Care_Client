"use client";
import { ISchedule, TDoctorSchedule } from "@/types/schedules";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

type ScheduleButtonsProps = {
    doctorSchedules: TDoctorSchedule[];
    setScheduleID: any;
    scheduleId: string;
};

const ScheduleButtons = ({
    doctorSchedules,
    setScheduleID,
    scheduleId,
}: ScheduleButtonsProps) => {
    return doctorSchedules?.length > 0 ? (
        <Stack direction={"row"} gap={2} flexWrap="wrap">
            {doctorSchedules?.map((slot: TDoctorSchedule) => {
                const startDateTime = dayjs(slot?.schedule?.startDateTime).format(
                    "hh:mm A"
                );

                const endDateTime = dayjs(slot?.schedule?.endDateTime).format(
                    "hh:mm A"
                );

                const slotId = slot?.scheduleId;

                return (
                    <Button
                        onClick={() => setScheduleID(slotId)}
                        key={slotId}
                        variant={
                            scheduleId === slotId ? "contained" : "outlined"
                        }>
                        {`${startDateTime} - ${endDateTime}`}
                    </Button>
                );
            })}
        </Stack>
    ) : (
        <Typography variant="body1" color="error" textAlign="center" fontWeight={600}>
            No slots available
        </Typography>
    );
};

export default ScheduleButtons;
