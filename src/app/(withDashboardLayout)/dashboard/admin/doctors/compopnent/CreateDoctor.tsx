import N_FileUploader from "@/components/forms/N_FileUploader";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Select from "@/components/forms/N_Select";
import N_Modal from "@/components/modals/N_Modal";
import { Gender } from "@/constants/commmon";
import { useCreateDoctorMutation } from "@/redux/api/doctorsApi";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { TOpenState } from "@/types/common";
import { modifyPayload } from "@/utils/modifyPayload";
import tryCatch from "@/utils/tryCatch";
import { Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";

const CreateDoctor = ({ open, setOpen }: TOpenState) => {
    const [createDoctor] = useCreateDoctorMutation();

    const handleSubmit = async (values: FieldValues) => {
        values.doctor.experience = Number(values.doctor.experience);
        values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
        const data = modifyPayload(values);
        tryCatch(
            async () => await createDoctor(data),
            "Creating Doctor",
            "Doctor created successfully",
            () => setOpen?.(false)
        );
    };
    return (
        <N_Modal fullScreen open={open} setOpen={setOpen} title="Create  New Doctor">
            <N_Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.name" label="Name" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.email" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="password" type="password" label="Password" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.contactNumber" label="Contract Number" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.address" label="Address" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.registrationNumber" label="Registration Number" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.experience" type="number" label="Experience" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Select items={Gender} name="doctor.gender" label="Gender" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.apointmentFee" type="number" label="ApointmentFee" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.qualification" label="Qualification" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.currentWorkingPlace" label="Current Working Place" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input name="doctor.designation" label="Designation" />
                    </Grid>
                </Grid>

                <Stack direction="row" justifyContent="flex-end" mt={2}>
                    <Button type="submit">Create</Button>
                </Stack>
            </N_Form>
        </N_Modal>
    );
};

export default CreateDoctor;
