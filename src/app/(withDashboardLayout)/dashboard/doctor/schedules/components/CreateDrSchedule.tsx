"use client";
import N_DatePicker from "@/components/forms/N_DatePicker";
import N_Form from "@/components/forms/N_Form";
import N_MultiSelect from "@/components/forms/N_MultiSelect";
import N_Select from "@/components/forms/N_Select";
import N_Modal from "@/components/modals/N_Modal";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";
import { useGetSchedulesQuery } from "@/redux/api/schedulesApi";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { tryCatch } from "@/utils/tryCatch";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const formatedTime = (time: string) => {
    const timeStr = time;
    const timeObj = dayjs(timeStr);
    const twelveHourFormat = timeObj.format("hh:mmA");
    return twelveHourFormat;
};

const CreateDrSchedule = () => {
    const dispatch = useAppDispatch();
    const query = {} as any;

    const methods = useForm({
        defaultValues: {
            pickDate: dayjs(new Date().toDateString()),
        },
    });
    const { handleSubmit, watch, reset, setError } = methods;

    const pickedDate = watch("pickDate");
    console.log("pickedDate", pickedDate);

    // if (pickedDate) {
    //     query.startDate = new Date(pickedDate).toISOString()
    //     query.endDate = new Date(pickedDate)
    // }
    if (!!pickedDate) {
        query["startDate"] = dayjs(pickedDate) //start of the day
            .hour(0)
            .minute(0)
            .millisecond(0)
            .toISOString();
        query["endDate"] = dayjs(pickedDate) //end of the day
            .hour(23)
            .minute(59)
            .millisecond(999)
            .toISOString();
    }

    const { data: schedules } = useGetSchedulesQuery(query, { skip: !pickedDate });

    // if (schedules?.data?.length === 0) {
    //     setError("pickDate", {
    //         type: "manual",
    //         message: "No schedules available for the selected date",
    //     });
    // }
    const hasNoSchedulesError = schedules?.data?.length === 0;

    const schedulesData = schedules?.data?.map((schedule: Record<string, any>) => ({
        label: `${formatedTime(schedule.startDate)} - ${formatedTime(schedule.endDate)}`,
        value: schedule.id,
    }));

    const [createDrSchedule] = useCreateDoctorScheduleMutation();

    const onSubmit = (values: Record<string, any>) => {
        const data = { scheduleIds: values.availableSchedule };

        tryCatch(
            async () => await createDrSchedule(data),
            "Creating Doctor Schedule",
            "Doctor Schedule Created Successfully",
            () => {
                reset();
                dispatch(closeModal());
            }
        );
    };

    return (
        <N_Modal title="Create Doctor Schedule" modalId="createDrSchedule">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2} width={400}>
                    <N_DatePicker name="pickDate" label="Pick Date" methods={methods} />
                    <N_MultiSelect
                        items={schedulesData}
                        name="availableSchedule"
                        label="Available Schedule"
                        methods={methods}
                        disabled={!schedules || schedulesData?.length === 0}
                    />
                    {hasNoSchedulesError && (
                        <Typography color="error">
                         No schedule available for {dayjs(pickedDate).format("MMMM D, YYYY")}
                        </Typography>
                    )}
                    <Button type="submit">Create</Button>
                </Stack>
            </form>
        </N_Modal>
    );
};

export default CreateDrSchedule;
