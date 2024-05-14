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

const PatientProfilePage = () => {
    const { data, isLoading } = useGetMyProfileQuery(undefined);

    const patientData:IPatient = data?.data;

    const dispatch = useAppDispatch();

    const handleUpload = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({}));

        // updateMyProfile({ data: formData });
    };

    return (
        <Stack direction={{ xs: "column", md: "row" }} px={5} spacing={4}>
            <Box width={{ sx: "100%", md: "40%" }}>
                <Image
                    src={patientData?.profilePhoto ?? ""}
                    width={400}
                    height={300}
                    alt="doctor"
                />
                <Stack my={2} width={{ xs: 400, md: "100%" }} spacing={1}>
                    <AutoFileUploader
                        name="file"
                        label="Upload Profile Photo"
                        icon={<CloudUploadIcon />}
                        onFileUpload={handleUpload}
                        variant="outlined"
                        isLoading={isLoading}
                    />
                    <Button
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "updateDoctorProfile",
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
            <Box width={{ sx: "100%", md: "60%" }}>
                {/* <DoctorInfo drProfile={patientData as IDoctor} /> */}
                <PatientInfo patientData={patientData} />
            </Box>
        </Stack>
    );
};

export default PatientProfilePage;
