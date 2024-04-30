"use client";

import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/myProfileApi";
import { IDoctor } from "@/types/Doctors";
import { Box, Button, Grid, Stack } from "@mui/material";
import Image from "next/image";
import DoctorInfo from "./components/DoctorInfo";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { tryCatch } from "@/utils/tryCatch";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import ProfileUpdate from "./components/ProfileUpdate";

const ProfilePage = () => {
    const { data } = useGetMyProfileQuery({}) as { data?: IDoctor };
    const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();

    const handleUpload = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({}));

        updateMyProfile({ data: formData });
    };

    const dispatch = useDispatch();
    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box width={{ sx: "100%", md: "30%" }}>
                    <Image src={data?.profilePhoto ?? ""} width={400} height={300} alt="doctor" />
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
                            onClick={() => dispatch(openModal({ modalId: "updateDoctorProfile" }))}
                            fullWidth
                            endIcon={<ModeEditIcon />}
                            >
                            Update Profile
                        </Button>
                        <ProfileUpdate id={data?.id} />
                    </Stack>
                </Box>
                <Box width={{ sx: "100%", md: "70%" }}>
                    <DoctorInfo drProfile={data} />
                </Box>
            </Stack>
        </Box>
    );
};

export default ProfilePage;
