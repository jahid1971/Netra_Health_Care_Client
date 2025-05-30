import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";

import { Grid, Stack } from "@mui/material";


const AdminForm = ({
    handleSubmit,
    submitTitle,
    defaultValue,

    onlyDirtyFields,
    editMode,
}: {
    handleSubmit: any;
    submitTitle: string;
    defaultValue?: any;
    onlyDirtyFields?: boolean;
    editMode?: boolean;
}) => {
    return (
        <N_Form
            onSubmit={handleSubmit}
            defaultValues={defaultValue}
            onlyDirtyFields={onlyDirtyFields}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <N_Input name="name" label="Name" />
                </Grid>

                {!editMode && (
                    <Grid item xs={12} md={4}>
                        <N_Input name="email" label="Email" />
                    </Grid>
                )}

                {!editMode && (
                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="password"
                            type="password"
                            label="Default Password"
                            defaultValue="123456"
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={4}>
                    <N_Input name="contactNumber" label="Contract Number" />
                </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" mt={2}>
                <SubmitButton label={submitTitle} fullWidth={false} />
            </Stack>
        </N_Form>
    );
};

export default AdminForm;
