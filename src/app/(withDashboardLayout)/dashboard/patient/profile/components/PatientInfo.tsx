import { IDoctor } from "@/types/Doctors";
import { IPatient } from "@/types/Patient";
import { Box, Grid, Stack, Typography } from "@mui/material";

const ProfileField: React.FC<{
    label: string;
    value: string | number | undefined;
}> = ({ label, value }) => (
    <Grid item xs={12}>
        <Box
            sx={{
                width: "100%",
                backgroundColor: "white",
                py: 1,
                px: 2,
                borderRadius: 2,
                // boxShadow: 2,
            }}
        >
            <Typography
                color="textSecondary"
                variant="caption"
                sx={{ fontWeight: "bold" }}
            >
                {label}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
                {value}
            </Typography>
        </Box>
    </Grid>
);

const PatientInfo = ({ patientData }: { patientData: IPatient }) => {
    console.log("🚀 ~ PatientInfo ~ patientData:", patientData);

    const joinedAt = patientData?.createdAt
        ? new Date(patientData?.createdAt).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
          })
        : undefined;

    return (
        <>
            <Typography variant="h5" color="primary.main" mb={1}>
                MY PROFILE
            </Typography>
            <Grid container spacing={2}>
                <ProfileField label="Name" value={patientData?.name} />
                <ProfileField label="Email" value={patientData?.email} />
                <ProfileField
                    label="Contact Number"
                    value={patientData?.contactNumber}
                />

                <ProfileField label="Address" value={patientData?.address} />
                <ProfileField label="Joined At" value={joinedAt} />
            </Grid>
        </>
    );
};

export default PatientInfo;
