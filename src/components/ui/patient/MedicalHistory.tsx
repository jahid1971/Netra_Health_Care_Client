import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Field = ({
    label,
    value,
    minWidth = "70%",
}: {
    label: string;
    value: string;
    minWidth?: string;
}) => (
    <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={1}
        px={{ xs: 2, md: 6 }}
        borderRadius={2}
        sx={{ backgroundColor: "white" }}
        border={`1px solid ${grey[300]}`}
    >
        <Typography
            fontSize={"16px"}
            fontWeight={700}
            color={grey[700]}
            pr={10}
            width={"50%"}
            sx={{ minWidth: minWidth }}
        >
            <span>• </span> {label}
        </Typography>
        <Typography variant="body1">{value || "N/A"}</Typography>
    </Stack>
);

const PtMedicalHistory = ({ mediHistory, noPadding }: any) => {
    const age = mediHistory?.dateOfBirth
        ? new Date().getFullYear() -
          new Date(mediHistory.dateOfBirth).getFullYear()
        : "N/A";

    return (
        <Stack px={!noPadding ? { sm: 2, lg: 18 } : undefined} spacing={1}>
            <Typography
                variant="h5"
                color={grey[700]}
                textAlign={"center"}
                py={2}
            >
                Medical History
            </Typography>

            <Field label="Blood Group" value={mediHistory?.bloodGroup} />

            <Field label="Gender" value={mediHistory?.gender} />

            <Field label="Age" value={age ? age + "y" : ""} />

            <Field
                label="Has Diabetes"
                value={mediHistory?.hasDiabetes ? "YES" : "NO"}
            />
            <Field
                label="Has Allergies"
                value={mediHistory?.hasAllergies ? "YES" : "NO"}
            />

            <Field
                label="Height"
                value={mediHistory?.height ? mediHistory.height + "''" : ""}
            />

            <Field
                label="Weight"
                value={mediHistory?.weight ? mediHistory.weight + " kg" : ""}
            />

            <Field
                label="Smoking Status"
                value={mediHistory?.smokingStatus ? "YES" : "NO"}
            />

            <Field
                label="Pregnancy Status"
                value={mediHistory?.pregnancyStatus ? "YES" : "NO"}
            />

            <Field
                label="Has Past Surgeries"
                value={mediHistory?.hasPastSurgeries ? "YES" : "NO"}
            />

            <Field
                label="Recent Anxiety"
                value={mediHistory?.recentAnxiety ? "YES" : "NO"}
            />

            <Field
                label="Recent Depression"
                value={mediHistory?.recentDepression ? "YES" : "NO"}
            />

            <Field label="Marital Status" value={mediHistory?.maritalStatus} />

            <Field
                label="Mental Health History"
                value={mediHistory?.mentalHealthHistory}
                minWidth="50%"
            />

            <Field
                label="Patient Concerns"
                value={mediHistory?.wantToAdd}
                minWidth="50%"
            />
        </Stack>
    );
};

export default PtMedicalHistory;
