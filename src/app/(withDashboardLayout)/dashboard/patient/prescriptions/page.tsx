"use client";
import { useGetMyPrescriptionsQuery } from "@/redux/api/prescriptionApi";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import PrescriptionCard from "./components/PrescriptionCard";

const PatientPrescription = () => {
    const { data } = useGetMyPrescriptionsQuery(undefined);
    const myPresCription = data?.data;
    console.log(myPresCription);

    return (
        <Stack spacing={4}>
            <Typography
                variant="h4"
                fontWeight={600}
                textAlign="center"
                sx={{
                    marginBottom: 3,
                    color: grey[700],
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                }}
            >
                Prescriptions
            </Typography>
            {myPresCription?.map((pr, index) => (
                <PrescriptionCard key={index} data={pr} serial={index} />
            ))}

            <Box sx={{ display: "absolute" }}></Box>
        </Stack>
    );
};

export default PatientPrescription;
