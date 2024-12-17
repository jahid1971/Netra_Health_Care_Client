"use client";

import { useEffect, useState } from "react";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import PersonIcon from "@mui/icons-material/Person";
import { useUpdateAdminMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { tryCatch } from "@/utils/tryCatch";
import UpdateAdminForm from "./components/updateAdminForm";
import Edit_Input from "@/components/forms/Edit_Input";
import N_Form from "@/components/forms/N_Form";
import { FieldValues } from "react-hook-form";

const AdminProfilePage = () => {
    const { data } = useGetMyProfileQuery(undefined);
    const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
    const adminData = data?.data;
    const dispatch = useDispatch();
    const [isFileUploading, setIsFileUploading] = useState(false);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    if (!adminData) {
        return <div>Loading...</div>;
    }

    const handleUpload = (file: File) => {
        setIsFileUploading(true);
        const modifiedData = { file };

        tryCatch(
            async () =>
                await updateAdmin({
                    data: modifiedData,
                    id: adminData?.adminId,
                }),
            undefined,
            undefined,
            () => setIsFileUploading(false)
        );
    };

    const handleUpdate = (data: FieldValues) => {
        const modifiedData = { data };

        tryCatch(
            async () =>
                await updateAdmin({
                    data: modifiedData,
                    id: adminData?.adminId,
                }),
            "Updating Admin Profile",
            "Admin Profile Updated Successfully"
        );
    };

    return (
        <Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box width={{ xs: "100%", md: "25%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "350px",
                        }}
                    >
                        {adminData?.profilePhoto ? (
                            <Box my={1}>
                                <Image
                                    src={adminData.profilePhoto}
                                    alt="Profile Photo"
                                    width={250}
                                    height={250}
                                    objectFit="cover"
                                />
                            </Box>
                        ) : (
                            <PersonIcon
                                sx={{ fontSize: 250, color: "#1586FD" }}
                            />
                        )}
                    </Box>
                    <Stack width={{ xs: 400, md: "100%" }} spacing={1}>
                        <AutoFileUploader
                            name="file"
                            label="Upload Profile Photo"
                            icon={<CloudUploadIcon />}
                            onFileUpload={handleUpload}
                            variant="outlined"
                            isLoading={isFileUploading}
                        />
                        <Button
                            onClick={() =>
                                dispatch(
                                    openModal({
                                        modalId: "updateAdmin",
                                    })
                                )
                            }
                            fullWidth
                            endIcon={<ModeEditIcon />}
                        >
                            Update Profile
                        </Button>
                    </Stack>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <N_Form
                        onSubmit={handleUpdate}
                        onlyDirtyFields={true}
                        defaultValues={adminData}
                    >
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Edit_Input
                                    name="name"
                                    label="Name"
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item>
                                <Edit_Input
                                    name="email"
                                    label="Email"
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item>
                                <Edit_Input
                                    name="contactNumber"
                                    label="Contact Number"
                                    type="number"
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item>
                                <Edit_Input
                                    name="role"
                                    label="Role"
                                    editable={false}
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item>
                                <Edit_Input
                                    name="status"
                                    label="Status"
                                    editable={false}
                                    isLoading={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </N_Form>
                </Box>
            </Stack>
            <UpdateAdminForm adminData={adminData} />
        </Box>
    );
};

export default AdminProfilePage;
