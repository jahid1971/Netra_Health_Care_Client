"use client";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import N_Checkbox from "@/components/forms/N_Checkbox";
import N_DatePicker from "@/components/forms/N_DatePicker";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Select from "@/components/forms/N_Select";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import N_Modal from "@/components/modals/N_Modal";
import { bloodGroups, Gender } from "@/constants/commmon";
import { Grid, Stack } from "@mui/material";
import SubmitButton from "@/components/ui/SubmitButton";
import N_FileUploader from "@/components/forms/N_FileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import {
    useGetPtMedicaltHistoryQuery,
    useUpdateMedicalHistoryMutation,
} from "@/redux/api/patientApi";
import { tryCatch } from "@/utils/tryCatch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, useUserSelector } from "@/redux/slices/authSlice";
import { useModalClose } from "@/redux/slices/modalSlice";

const maritalStatus = [
    { label: "Married", value: "married" },
    { label: "Unmarried", value: "unMarried" },
];

const UpdateMedicalHistory = () => {
    const patient = useUserSelector();
    const closeModal = useModalClose();

    const { data } = useGetPtMedicaltHistoryQuery({ id: patient?.patientId });

    const defaultValue = data?.data;

    console.log(defaultValue, "default value");

    const [updatePtMedicalHistory] = useUpdateMedicalHistoryMutation();

    const handleSubmit = (data) => {
        const defaultData = {
            hasAllergies: false,
            hasDiabetes: false,
            smokingStatus: false,
            pregnancyStatus: false,
            immunizationStatus: false,
            hasPastSurgeries: false,
            recentAnxiety: false,
            recentDepression: false,
        };

        const payload = {
            ...defaultData,
            ...data,
        };

        const modifiedPayload = modifyPayload(payload);

        tryCatch(
            async () => await updatePtMedicalHistory({ data: modifiedPayload }),
            "Updating Medical History",
            "Medical History Updated Successfully",
            closeModal
        );
    };

    console.log(defaultValue, "default value");
    return (
        <N_Modal
            fullScreen
            title="Update Medical History"
            modalId="medicalHiostory"
        >
            <N_Form onSubmit={handleSubmit} defaultValues={defaultValue}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        {/* <AutoFileUploader
                            name="file"
                            label="Upload Test Reports"
                            icon={<CloudUploadIcon />}
                            // onFileUpload={handleUpload}
                            variant="outlined"
                            // isLoading={isUpdating}
                        /> */}
                        <N_FileUploader
                            name="file"
                            label="Upload Test Report"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Select
                            items={bloodGroups}
                            name="bloodGroup"
                            label="Blood Group"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Select items={Gender} name="gender" label="Gender" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_DatePicker
                            disablePast={false}
                            name="dateOfBirth"
                            label="Date of Birth"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="height"
                            label="Height"
                            placeholder="(e.g.: 5'7)"
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="weight"
                            label="Weight"
                            placeholder="e.g., 70 (in kg)"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Select
                            items={maritalStatus}
                            label="Matrial Status"
                            name="maritalStatus"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox
                            name="hasAllergies"
                            label="Has Allergies?"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox name="hasDiabetes" label="Has Diabetes?" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox name="smokingStatus" label="Smoker?" />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox
                            name="pregnancyStatus"
                            label="Pregnancy Status"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox
                            name="hasPastSurgeries"
                            label="Had Past Surgeries?"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox
                            name="recentAnxiety"
                            label="Recent Anxiety Issues?"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Checkbox
                            name="recentDepression"
                            label="Recent Depression Issues?"
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="mentalHealthHistory"
                            label="Mental Health History"
                            multiline
                            // rows={2}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <N_Input
                            name="wantToAdd"
                            label="Want to add more?"
                            placeholder="Add more details here"
                            multiline
                            // rows={2}
                        />
                    </Grid>
                </Grid>
                <Stack direction={"row"} justifyContent={"center"}>
                    <SubmitButton
                        fullWidth={false}
                        label="Submit"
                        sx={{ width: "150px", mt: 2 }}
                    />
                </Stack>
            </N_Form>
        </N_Modal>
    );
};

export default UpdateMedicalHistory;
