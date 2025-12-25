import defaultDoctorPhoto from "@/assets/icons/doctor_icon.png";
import { IDoctor } from "@/types/Doctors";
import StarIcon from "@mui/icons-material/Star";
import { Box, Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = async ({ doctor }: { doctor: IDoctor }) => {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            gap={{ md: 1 }}
            my={{ xs: 4, md: 0 }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                flex={1}
                gap={3}
                sx={{ height: 235, bgcolor: "white", p: 3 }}
                width={{ xs: "100%", md: "65%" }}
            >
                <Box
                    sx={{
                        // bgcolor: "#808080",
                        "& img": {
                            overflow: "hidden",
                            objectFit: "cover",
                        },
                    }}
                >
                    <Image
                        src={
                            doctor?.profilePhoto
                                ? doctor.profilePhoto
                                : defaultDoctorPhoto
                        }
                        alt="doctor image"
                        width={190}
                        height={190}
                        style={{
                            height: "190px",
                        }}
                    />
                </Box>

                <Stack flex={1} justifyContent="space-between">
                    <Box sx={{ flex: 1, mb: { xs: 2, md: 0 } }}>
                        <Typography
                            fontSize={20}
                            fontWeight={600}
                            color={grey[600]}
                        >
                            {doctor?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ mb: "2px", color: "" }}
                        >
                            {doctor?.designation}
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.primary",
                                maxWidth: "45ch",
                            }}
                            variant="body2"
                        >
                            {doctor?.specialties?.length ? (
                                <>
                                    Specialist in-{" "}
                                    <Typography
                                        component="span"
                                        fontSize={16}
                                        fontWeight={600}
                                        color={grey[600]}
                                    >
                                        {doctor.specialties
                                            .map((s) => s.title)
                                            .join(", ")}
                                    </Typography>
                                </>
                            ) : (
                                ""
                            )}
                        </Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between">
                        <Box>
                            <Stack
                                direction="row"
                                alignItems="center"
                                sx={{ m: 0 }}
                            >
                                <Typography
                                    fontSize={20}
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: "600",
                                    }}
                                >
                                    Taka: {doctor?.apointmentFee}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "inline",
                                        ml: "2px",
                                        color: "text.primary",
                                    }}
                                >
                                    (incl. Vat)
                                </Typography>
                            </Stack>
                            <Typography variant="caption" color="text.primary">
                                Per consultation
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "flex-end",
                            }}
                        >
                            <Link
                                href={`/dashboard/patient/doctors/checkout/${doctor?.id}`}
                            >
                                <Button size="small">Book Now</Button>
                            </Link>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                sx={{
                    height: { md: 235, xs: "auto" },
                    bgcolor: "white",
                    p: 3,
                }}
                width={{ xs: "100%", md: "35%" }}
            >
                <Box flex={1} display={{ xs: "none", md: "block" }}>
                    <Typography variant="body2" color="text.primary">
                        Working in
                    </Typography>
                    <Typography
                        sx={{ fontWeight: "600", mt: "3px" }}
                        color={grey[600]}
                    >
                        {doctor?.currentWorkingPlace}
                    </Typography>
                </Box>

                <Box>
                    <Stack direction="row" justifyContent="space-between">
                        <Box>
                            <Typography variant="body2">
                                Total Experience
                            </Typography>
                            <Typography
                                fontSize={16}
                                sx={{ fontWeight: "600" }}
                                color={grey[600]}
                            >
                                {doctor?.experience}+ Years
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={"4px"}>
                            <StarIcon fontSize="medium" color="primary" />
                            <Typography variant="body1" color="text.primary">
                                {" "}
                                {doctor?.averageRating} (
                                {doctor?.ratingCount ?? 0})
                                {/* {(doctor?.ratingCount ?? 0) > 0 &&
                                    `(${doctor?.ratingCount})`} */}
                            </Typography>
                        </Box>
                    </Stack>

                    <Box display="flex" mt={1} justifyContent={"flex-end"}>
                        <Button
                            size="small"
                            component={Link}
                            href={`/dashboard/patient/doctors/${doctor.id}`}
                        >
                            View Details
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default DoctorCard;
