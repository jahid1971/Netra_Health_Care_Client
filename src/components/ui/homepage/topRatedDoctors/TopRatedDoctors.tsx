import { IDoctor } from "@/types/Doctors";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { baseUrl } from "@/constants/commmon";
import defaultDoctorPhoto from "@/assets/svgs/profile.svg";
// import defaultDoctorPhoto from "@/assets/icons/doctor_icon.png";

const TopRatedDoctors = async () => {
    const res = await fetch(`${baseUrl}/doctor?page=1&limit=3`);
    const { data: doctors }: { data: IDoctor[] } = await res.json();

    return (
        <Box position="relative" sx={{ overflow: "hidden" }}>
            {/* Background with clip-path */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "secondary.main",
                    clipPath: {
                        xs: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
                        sm: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
                    },
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    // zIndex: 2,
                    py: {
                        xs: 12,
                        sm: 24,
                    },
                }}
            >
                <Box textAlign={"center"}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        color={"primary.main"}
                    >
                        Our Top Rated Doctors
                    </Typography>
                </Box>

                <Container sx={{ my: 5 }}>
                    <Grid container spacing={3}>
                        {doctors?.map((doctor: IDoctor) => (
                            <Grid
                                item
                                key={doctor.id}
                                md={4}
                                xs={10}
                                mx={"auto"}
                            >
                                <Card sx={{ width: "100%" }}>
                                    <Box
                                        sx={{
                                            color: "red",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                            overflow: "hidden",
                                            "& img": {
                                                objectFit: "cover",
                                                width: "100%",
                                                height: "100%",
                                            },
                                        }}
                                    >
                                        {doctor?.profilePhoto ? (
                                            <Image
                                                src={doctor?.profilePhoto}
                                                alt="doctor"
                                                width={300}
                                                height={300}
                                                objectFit="cover"
                                            />
                                        ) : (
                                            <Box
                                                p={2}
                                                sx={{
                                                    bgcolor: grey[100],
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            >
                                                <Image
                                                    src={defaultDoctorPhoto}
                                                    alt="doctor"
                                                    width={300}
                                                    height={300}
                                                    objectFit="cover"
                                                />
                                            </Box>
                                        )}
                                    </Box>

                                    <Box p={1}>
                                        <Stack paddingLeft={"10px"}>
                                            <Typography variant="h5">
                                                {doctor?.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {doctor?.qualification},
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {doctor.designation}
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <LocationOnIcon /> {doctor?.address}
                                        </Typography>
                                        <CardActions>
                                            <Button sx={{ width: "100%" }}>
                                                Book Now
                                            </Button>
                                            <Button
                                                sx={{ width: "100%" }}
                                                variant="outlined"
                                            >
                                                View profile
                                            </Button>
                                        </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={"30px"} textAlign={"center"}>
                        <Link href={"doctors"}>
                            <Button variant="outlined">View All Doctors</Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default TopRatedDoctors;
