import N_DatePicker from "@/components/forms/N_DatePicker";
import N_Form from "@/components/forms/N_Form";
import N_TimePicker from "@/components/forms/N_TimePicker";
import N_Modal from "@/components/modals/N_Modal";
import { useCreateScheduleMutation } from "@/redux/api/schedulesApi";
import { closeModal } from "@/redux/slices/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TOpenState } from "@/types/common";
import { tryCatch } from "@/utils/tryCatch";
import { Button, Grid, Modal } from "@mui/material";
import { FieldValues } from "react-hook-form";
import N_Input from "@/components/forms/N_Input";

const CreateSchedule = () => {
    const dispatch = useAppDispatch();

    const [createSchedule] = useCreateScheduleMutation();
    const handleSubmit = (values: FieldValues) => {
        tryCatch(
            async () => {
                const res = await createSchedule(values) as any
                if (res?.data?.data?.length < 1)
                    throw new Error("Failed to create schedule");
                return res;
            },
            "Creating Schedule",
            "Schedule created successfully",
            () => dispatch(closeModal())
        );
    };

    return (
        <N_Modal title="Create Schedule" modalId="createSchedule">
            <N_Form onSubmit={handleSubmit}>
                <Grid container spacing={2} width={"400px"}>
                    <Grid item xs={12}>
                        <N_DatePicker name="startDate" label="Start Date" />
                    </Grid>
                    <Grid item xs={12}>
                        <N_DatePicker name="endDate" label="End Date" />
                    </Grid>
                    <Grid item xs={6}>
                        <N_TimePicker name="startTime" label="Start Time" />
                    </Grid>
                    <Grid item xs={6}>
                        <N_TimePicker name="endTime" label="End Time" />
                    </Grid>
                    <Grid item xs={12}>
                        <N_Input
                            name="duration"
                            label="Duration (in minutes)"
                            type="number"
                        />
                    </Grid>
                </Grid>
                <Button type="submit" sx={{ mt: 1 }}>
                    Create
                </Button>
            </N_Form>
        </N_Modal>
    );
};

export default CreateSchedule;
