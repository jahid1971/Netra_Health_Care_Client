"use client";
import { IDoctor } from "@/types/Doctors";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import assets from "@/assets";

const TopRatedDoctors = async () => {
    const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
    const { data: doctors } = await res.json();

    console.log(doctors, "doctors");

    return (
        <Box
            sx={{ backgroundColor: grey[100], clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)", py: 24 }}>
            <Box textAlign={"center"}>
                <Typography component={"h1"} variant="h4" fontWeight={700}>
                    Our Top Rated Doctors
                </Typography>
                <Typography fontSize={18} mt={2}>
                    Access to expert physicians and surgeons, advanced technologies
                </Typography>
                <Typography fontSize={18}>and top-quality surgery facilities right here.</Typography>
            </Box>

            <Container sx={{ my: 5 }}>
                <Grid container spacing={3}>
                    {doctors?.map((doctor: IDoctor) => (
                        <Grid item key={doctor.id} md={4}>
                            <Card>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 300,
                                        "& img": {
                                            width: "100%",
                                            height: "100%",
                                            overflow: "hidden",
                                            objectFit: "cover",
                                        },
                                    }}>
                                    <Image
                                        src={doctor?.profilePhoto || assets.images.doctor3}
                                        alt="doctor"
                                        width={400}
                                        height={100}
                                        objectFit="cover"
                                    />
                                </Box>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {doctor?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {doctor?.qualification},{doctor.designation}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" mt={2}>
                                        <LocationOnIcon /> {doctor?.address}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button sx={{ width: "100%" }}>Book Now</Button>
                                    <Button sx={{ width: "100%" }} variant="outlined">
                                        View profile
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={"30px"} textAlign={"center"}>
                    <Button variant="outlined">View All Doctors</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default TopRatedDoctors;
