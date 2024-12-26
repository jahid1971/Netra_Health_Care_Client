"use client";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import UpdateMedicalHistory from "./components/UpdateMedicalHistory";
import { useGetPtMedicaltHistoryQuery } from "@/redux/api/patientApi";
import { TMedicalHistory } from "@/types/Patient";
import PtMedicalHistory from "@/components/ui/patient/MedicalHistory";
import { useUserSelector } from "@/redux/slices/authSlice";
import { TUser } from "@/types/common";

const MedicalHistory = ({ currentAppointment }: any) => {
    const dispatch = useAppDispatch();

    const patient = useUserSelector() as TUser;

    const { data } = useGetPtMedicaltHistoryQuery({
        id: currentAppointment?.patientId || patient?.patientId,
    });

    const mediHistory = data?.data as TMedicalHistory;

    return (
        <Box p={2}>
            <Button
                size="small"
                onClick={() =>
                    dispatch(openModal({ modalId: "medicalHiostory" }))
                }
            >
                Update Medical History
            </Button>

            <PtMedicalHistory noPadding={true} mediHistory={mediHistory} />
            <UpdateMedicalHistory />
        </Box>
    );
};

export default MedicalHistory;
