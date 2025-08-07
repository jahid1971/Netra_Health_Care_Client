"use client";
import AutoFileUploader from "@/components/forms/AutoFileUploader";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Paper, Stack, Typography, Divider, Skeleton } from "@mui/material";
import Image from "next/image";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import PatientInfo from "./components/PatientInfo";
import { IPatient } from "@/types/Patient";
import UpdatePatientProfile from "./components/UpdatePatientProfile";
import { modifyPayload } from "@/utils/modifyPayload";
import { useUpdatePatientMutation, useGetPtMedicaltHistoryQuery } from "@/redux/api/patientApi";
import { tryCatch } from "@/utils/tryCatch";
import PersonIcon from "@mui/icons-material/Person";
import { TMedicalHistory } from "@/types/Patient";

const PatientProfilePage = () => {
    const { data, isLoading } = useGetMyProfileQuery(undefined);
    const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();
    const patientData = data?.data as IPatient;
    const dispatch = useAppDispatch();

    // Fetch medical history for gender, dateOfBirth, etc.
    const { data: mediHistoryData, isLoading: isMediLoading } = useGetPtMedicaltHistoryQuery({ id: patientData?.patientId || patientData?.id });
    const mediHistory = mediHistoryData?.data as TMedicalHistory;

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
                alignItems: "flex-start",
                gap: 4,
                px: { xs: 1, md: 8 },
                py: { xs: 2, md: 4 },
                minHeight: "80vh",
                background: "linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)",
            }}
        >
            {/* Profile Card */}
            <Paper
                elevation={4}
                sx={{
                    width: { xs: "100%", md: 350 },
                    borderRadius: 4,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 4px 24px 0 rgba(21,134,253,0.08)",
                    background: "#fff",
                }}
            >
                <Box mt={2} mb={2}>
                    {isLoading ? (
                        <Skeleton variant="circular" width={180} height={180} />
                    ) : patientData?.profilePhoto ? (
                        <Image
                            src={patientData?.profilePhoto ?? ""}
                            width={180}
                            height={180}
                            alt="profile"
                            style={{ borderRadius: "50%", border: "4px solid #1586FD" }}
                        />
                    ) : (
                        <PersonIcon sx={{ fontSize: 180, color: "#1586FD" }} />
                    )}
                </Box>
                <Typography variant="h5" fontWeight={700} color="primary.main" mb={1}>
                    {isLoading ? <Skeleton width={120} /> : patientData?.name || "-"}
                </Typography>
                <Typography color="text.secondary" mb={2}>
                    {isLoading ? <Skeleton width={80} /> : patientData?.email || "-"}
                </Typography>
                <Divider sx={{ width: "100%", mb: 2 }} />
                <AutoFileUploader
                    name="file"
                    label="Upload Profile Photo"
                    icon={<CloudUploadIcon />}
                    onFileUpload={handleUpload}
                    variant="outlined"
                    isLoading={isUpdating}
                />
                <Button
                    onClick={() => dispatch(openModal({ modalId: "updatePatient" }))}
                    fullWidth
                    endIcon={<ModeEditIcon />}
                    sx={{ mt: 2, borderRadius: 2 }}
                    variant="contained"
                >
                    Update Profile
                </Button>
            </Paper>

            {/* Info Card */}
            <Paper
                elevation={2}
                sx={{
                    flexGrow: 1,
                    borderRadius: 4,
                    p: { xs: 2, md: 4 },
                    minWidth: 0,
                    background: "#fff",
                    boxShadow: "0 2px 12px 0 rgba(21,134,253,0.04)",
                }}
            >
                <Typography variant="h6" fontWeight={600} color="primary.main" mb={2}>
                    Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <PatientInfo patientData={patientData} />
                {/* Additional Info */}
                <Box mt={4}>
                    <Typography variant="subtitle1" fontWeight={500} color="text.secondary" mb={1}>
                        Account Details
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Box>
                            <Typography fontWeight={500} color="text.secondary">Gender</Typography>
                            <Typography>{isMediLoading ? <Skeleton width={60} /> : mediHistory?.gender || "-"}</Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight={500} color="text.secondary">Date of Birth</Typography>
                            <Typography>{isMediLoading ? <Skeleton width={80} /> : mediHistory?.dateOfBirth ? new Date(mediHistory.dateOfBirth).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }) : "-"}</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            {/* Update Modal */}
            <UpdatePatientProfile patientData={patientData} />
        </Box>
    );
};

export default PatientProfilePage;
