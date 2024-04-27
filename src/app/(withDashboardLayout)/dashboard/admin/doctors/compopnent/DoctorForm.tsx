import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Select from "@/components/forms/N_Select";
import { Gender } from "@/constants/commmon";
import { Button, Grid, Stack } from "@mui/material";

const DoctorForm = ({ handleSubmit, submitTitle, defaultValue, passwordField = true, isLoading }: any) => {
    return (
        <N_Form onSubmit={handleSubmit} defaultValues={defaultValue}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <N_Input name="name" label="Name" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="email" label="Email" />
                </Grid>
                {passwordField && (
                    <Grid item xs={12} md={4}>
                        <N_Input name="password" type="password" label="Password" />
                    </Grid>
                )}
                <Grid item xs={12} md={4}>
                    <N_Input name="contactNumber" label="Contract Number" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="address" label="Address" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="registrationNumber" label="Registration Number" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="experience" type="number" label="Experience" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Select items={Gender} name="gender" label="Gender" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="apointmentFee" type="number" label="ApointmentFee" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="qualification" label="Qualification" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="currentWorkingPlace" label="Current Working Place" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <N_Input name="designation" label="Designation" />
                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" mt={2}>
                <Button disabled={isLoading} type="submit">
                    {submitTitle}
                </Button>
            </Stack>
        </N_Form>
    );
};

export default DoctorForm;
