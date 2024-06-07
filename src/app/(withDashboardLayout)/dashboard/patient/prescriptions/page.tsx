"use client";
import { useGetMyPrescriptionsQuery } from "@/redux/api/prescriptionApi";
import { Box, Stack } from "@mui/material";
import PrescriptionCard from "./components/PrescriptionCard";

const PatientPrescription = () => {
    const { data } = useGetMyPrescriptionsQuery(undefined);
    const myPresCription = data?.data;
    console.log(myPresCription);

    return (
        <Stack spacing={4}>
            {myPresCription?.map((pr, index) => (
                <PrescriptionCard key={index} data={pr} serial={index} />
            ))}

              <Box sx={{display:"absolute"}}>
            </Box>
        </Stack>
    );
};

export default PatientPrescription;
