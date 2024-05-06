import { IDoctor } from "@/types/Doctors";
import { Box, Grid, Stack, Typography } from "@mui/material";

interface DoctorInfoProps {
    drProfile?: IDoctor;
}

const ProfileField: React.FC<{
    label: string;
    value: string | number | undefined;
}> = ({ label, value }) => (
    <Grid item xs={12} md={6}>
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#f4f7fe",
                py: 1,
                px: 2,
                borderRadius: 1,
            }}>
            <Typography
                color="textSecondary"
                variant="caption"
                sx={{ fontWeight: "bold" }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
                {value}
            </Typography>
        </Box>
    </Grid>
);

const DoctorInfo: React.FC<DoctorInfoProps> = ({ drProfile }) => {
    const joinedAt = drProfile?.createdAt
        ? new Date(drProfile?.createdAt).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
          })
        : undefined;

    return (
        <>
            <Typography variant="h5" color="primary.main" mb={1}>
                Personal Information
            </Typography>
            <Grid container spacing={2}>
                <ProfileField label="Role" value={drProfile?.role} />
                <ProfileField label="Name" value={drProfile?.name} />
                <ProfileField label="Email" value={drProfile?.email} />
                <ProfileField
                    label="Contact Number"
                    value={drProfile?.contactNumber}
                />
            </Grid>

            <Typography variant="h5" color="primary.main" mb={1} mt={2}>
                Professional Information
            </Typography>
            <Grid container spacing={2}>
                <ProfileField
                    label="Designation"
                    value={drProfile?.designation}
                />
                <ProfileField
                    label="specialty"
                    value={drProfile?.doctorSpecialties?.map(
                        (specialty) => specialty?.specialties?.title+", "
                    )}
                />
                <ProfileField
                    label="  Appointment Fee"
                    value={drProfile?.apointmentFee}
                />
                <ProfileField
                    label="Qualification"
                    value={drProfile?.qualification}
                />
                <ProfileField
                    label="Experience"
                    value={`${drProfile?.experience} years`}
                />
                <ProfileField
                    label="Current Working Place"
                    value={drProfile?.currentWorkingPlace}
                />
                <ProfileField label="Joined" value={joinedAt} />
                <ProfileField
                    label="Current Status"
                    value={drProfile?.status}
                />
                <ProfileField
                    label="Average Rating"
                    value={drProfile?.averageRating}
                />
            </Grid>
        </>
    );
};

export default DoctorInfo;
