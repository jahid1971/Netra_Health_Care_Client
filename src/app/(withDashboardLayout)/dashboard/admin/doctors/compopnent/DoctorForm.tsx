import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_MultiSelect from "@/components/forms/N_MultiSelect";
import N_Select from "@/components/forms/N_Select";
import SubmitButton from "@/components/ui/SubmitButton";
import { Gender } from "@/constants/commmon";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { Box, Button, Grid, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateSpecialities from "../../specialities/components/CreateSpecialities";
import { useAppDispatch } from "@/redux/hooks";
import { openChildModal } from "@/redux/slices/modalSlice";
import { ISpecialties } from "@/types/Doctors";

const DoctorForm = ({
    handleSubmit,
    submitTitle,
    defaultValue,
    passwordField = true,
    onlyDirtyFields,
}: any) => {
    const dispatch = useAppDispatch();

    const { data } = useGetAllSpecialitiesQuery(undefined);
    const allSpecialities = data?.data;

    const specialitiesData = allSpecialities?.map((item: any) => ({
        label: item.title,
        value: item.id,
    }));

    const defaultValueCopy = { ...defaultValue };

    defaultValueCopy.specialties = defaultValue?.specialties?.map(
        (item: ISpecialties) => item.id
    );

    return (
        <Box>
            <N_Form
                onSubmit={handleSubmit}
                defaultValues={defaultValueCopy}
                onlyDirtyFields={onlyDirtyFields}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <N_Input name="name" label="Name" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input name="email" label="Email" />
                    </Grid>

                    {passwordField && (
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

                    <Grid item xs={12} md={4}>
                        <N_Input name="address" label="Address" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="registrationNumber"
                            label="Registration Number"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="experience"
                            type="number"
                            label="Minimum Experience"
                            placeholder="experience in year  Ex: 5"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Select items={Gender} name="gender" label="Gender" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="apointmentFee"
                            type="number"
                            label="ApointmentFee"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input name="qualification" label="Qualification" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="currentWorkingPlace"
                            label="Current Working Place"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input name="designation" label="Designation" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack direction={"row"}>
                            {specialitiesData && (
                                <N_MultiSelect
                                    required={false}
                                    items={specialitiesData}
                                    name="specialties"
                                    label="Specialities"
                                    disabled={
                                        !allSpecialities ||
                                        allSpecialities?.length === 0
                                    }
                                />
                            )}
                            <Button
                                onClick={() =>
                                    dispatch(
                                        openChildModal({
                                            modalId: "createSpeciality",
                                        })
                                    )
                                }
                                variant="outlined"
                                sx={{
                                    borderRadius: "0 8px 8px 0",
                                    borderLeft: "0",
                                }}
                            >
                                <AddIcon />
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                <Stack direction="row" justifyContent="flex-end" mt={2}>
                    <SubmitButton label={submitTitle} fullWidth={false} />
                </Stack>
            </N_Form>
            <CreateSpecialities asChildModal={true} />
        </Box>
    );
};

export default DoctorForm;
