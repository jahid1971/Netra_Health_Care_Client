"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { Box, Button, Paper, Stack, Typography, Divider } from "@mui/material";
import UpdateMedicalHistory from "./components/UpdateMedicalHistory";
import { useGetPtMedicaltHistoryQuery } from "@/redux/api/patientApi";
import { TMedicalHistory } from "@/types/Patient";
import PtMedicalHistory from "@/components/ui/patient/MedicalHistory";
import { useUserSelector } from "@/redux/slices/authSlice";
import { TUser } from "@/types/common";
import {
    Edit as EditIcon,
    MedicalInformation as MedicalInfoIcon,
} from "@mui/icons-material";

const MedicalHistory = ({ currentAppointment }: any) => {
    const dispatch = useAppDispatch();
    const patient = useUserSelector() as TUser;
    const { data } = useGetPtMedicaltHistoryQuery({
        id: currentAppointment?.patientId || patient?.patientId,
    });
    const mediHistory = data?.data as TMedicalHistory;

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: "80vh",
                width: "100%",
                background:
                    "linear-gradient(135deg, #f8fafc 60%, #e3f0ff 100%)",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: { xs: "100%", sm: 500, md: 650 },
                    borderRadius: 4,
                    p: { xs: 2, sm: 4 },
                    boxShadow: "0 4px 24px 0 rgba(21,134,253,0.08)",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <MedicalInfoIcon color="primary" fontSize="large" />
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="primary.main"
                        >
                            Medical History
                        </Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() =>
                            dispatch(openModal({ modalId: "medicalHiostory" }))
                        }
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Update
                    </Button>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Box>
                    <PtMedicalHistory noPadding mediHistory={mediHistory} />
                </Box>
            </Paper>
            <UpdateMedicalHistory />
        </Stack>
    );
};

export default MedicalHistory;
