import { defaultDoctorPhoto } from "@/constants/authKey";
import { Doctor } from "@/types/Doctors";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
    return (
        <Stack direction={{ xs: "column", md: "row" }} gap={{ md: 1 }} my={{ xs: 4, md: 0 }}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                flex={1}
                gap={3}
                sx={{ height: 235, bgcolor: "white", p: 3 }}>
                <Box
                    sx={{
                        // bgcolor: "#808080",
                        "& img": {
                            overflow: "hidden",
                            objectFit: "cover",
                        },
                    }}>
                    <Image
                        src={doctor?.profilePhoto ? doctor.profilePhoto : defaultDoctorPhoto}
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
                        <Typography variant="h6" fontWeight={600}>
                            {doctor?.name}
                        </Typography>
                        <Typography sx={{ my: "2px", color: "secondary.main" }}>
                            {doctor?.designation}
                        </Typography>
                        <Typography noWrap sx={{ color: "secondary.main", maxWidth: "45ch" }}>
                            {doctor?.doctorSpecialties?.length
                                ? "Specialties in" +
                                  " " +
                                  doctor?.doctorSpecialties?.map((specialty) => specialty?.specialties?.title)
                                : ""}
                        </Typography>
                    </Box>
             
                    <Stack direction="row" justifyContent="space-between">
                        <Box>
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "600" }}>
                                    Taka : {doctor?.apointmentFee}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: "inline",
                                        ml: '2px',
                                        color: "secondary.main",
                                    }}>
                                    (incl. Vat)
                                </Typography>
                            </Stack>
                            <Typography variant="caption" color="secondary.main">
                                Per consultation
                            </Typography>
                        </Box>
                        <Box>
                            <Link href={`/checkout/${doctor?.id}`}>
                                <Button size="small">Book Now</Button>
                            </Link>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Stack sx={{ height: 235, bgcolor: "white", width: { xs: "100%", md: "400px" }, p: 3 }}>
                <Box flex={1}>
                    <Typography color="secondary.main">Working in</Typography>
                    <Typography sx={{ fontWeight: "600", mt: "3px" }}>
                        {doctor?.currentWorkingPlace}
                    </Typography>
                </Box>
     
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Typography color="secondary.main">Total Experience</Typography>
                        <Typography variant="h6" sx={{ fontWeight: "600" }}>
                            {doctor?.experience}+ Years
                        </Typography>
                    </Box>
                    <Box>
                        <Button size="small" component={Link} href={`/doctors/${doctor.id}`}>
                            View Details
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default DoctorCard;
