"use client";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import PatientInfo from "./components/PatientInfo";
import { IPatient } from "@/types/Patient";
import UpdatePatientProfile from "./components/UpdatePatientProfile";
import { modifyPayload } from "@/utils/modifyPayload";
import { useUpdatePatientMutation } from "@/redux/api/patientApi";
import { tryCatch } from "@/utils/tryCatch";

const PatientProfilePage = () => {
    const { data, isLoading } = useGetMyProfileQuery(undefined);

    const [updatePatient, { isLoading: isUpdating }] =
        useUpdatePatientMutation();

    const patientData: IPatient = data?.data;

    const dispatch = useAppDispatch();

    const handleUpload = (file: File) => {
        const payload = modifyPayload({ file });

        tryCatch(
            async () =>
                await updatePatient({
                    id: patientData?.patientId,
                    data: payload,
                })
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                gap: 2,
            }}
            px={{ md: 10 }}
            // spacing={4}
        >
            <Box width={{ sx: "100%", md: "40%" }} sx={{ flexGrow: 1 }}>
                <Box mt={{ md: 5 }}>
                    <Image
                        src={patientData?.profilePhoto ?? ""}
                        width={300}
                        height={200}
                        alt="doctor"
                    />
                </Box>
                <Stack my={2} width={300} spacing={1}>
                    <AutoFileUploader
                        name="file"
                        label="Upload Profile Photo"
                        icon={<CloudUploadIcon />}
                        onFileUpload={handleUpload}
                        variant="outlined"
                        isLoading={isUpdating}
                    />
                    <Button
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "updatePatient",
                                })
                            )
                        }
                        fullWidth
                        endIcon={<ModeEditIcon />}
                    >
                        Update Profile
                    </Button>
                    {/* <ProfileUpdate patientData={patientData as IDoctor} /> */}
                </Stack>
            </Box>
            <Box width={{ sx: "100%", md: "60%" }} sx={{ flexGrow: 2 }}>
                {/* <DoctorInfo drProfile={patientData as IDoctor} /> */}
                <PatientInfo patientData={patientData} />
            </Box>

            <UpdatePatientProfile patientData={patientData} />
        </Box>
    );
};

export default PatientProfilePage;
