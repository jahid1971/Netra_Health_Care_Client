"use client";
import { ISchedule } from "@/types/schedules";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

type ScheduleButtonsProps = {
    doctorSchedules: ISchedule[];
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
            {doctorSchedules?.map((slot: ISchedule) => {
                const startTime = dayjs(slot?.schedule?.startDate).format(
                    "hh:mm A"
                );

                const endTime = dayjs(slot?.schedule?.endDate).format(
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
                        {`${startTime} - ${endTime}`}
                    </Button>
                );
            })}
        </Stack>
    ) : (
        <Typography variant="body1" color="error" fontWeight={600}>
            No slots available
        </Typography>
    );
};

export default ScheduleButtons;
