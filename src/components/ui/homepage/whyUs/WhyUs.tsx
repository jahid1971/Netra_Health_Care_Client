import assets from "@/assets";
import chooseUsImg from "@/assets/choose-us.png";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import Image from "next/image";

const servicesData = [
    {
        imageSrc: assets.svgs.award,
        title: "Award Winning Service",
        description:
            "Recognized for excellence in patient care, ensuring the highest standards in all aspects of our services.",
    },
    {
        imageSrc: assets.svgs.care,
        title: "Best Quality Pregnancy Care",
        description:
            "Providing comprehensive and compassionate care to expectant mothers for a healthy pregnancy and safe delivery.",
    },
    {
        imageSrc: assets.svgs.equipment,
        title: "Complete Medical Equipments",
        description:
            "Equipped with the latest medical technology to ensure accurate diagnosis and effective treatment for all patients.",
    },
    {
        imageSrc: assets.svgs.call,
        title: "Dedicated Emergency Care",
        description:
            "Offering 24/7 emergency services with a team of experienced professionals ready to handle any medical crisis.",
    },
];

const WhyUs = () => {
    return (
        <Container>
            <Box>
                <Box textAlign={"center"}>
                    <Typography variant="h6" color={"primary"} fontWeight={700}>
                        Why Us
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                        Why Choose Us
                    </Typography>
                </Box>
            </Box>
            <Grid container direction={{ md: "row" }} spacing={5} alignItems={"center"} py={2}>
                <Grid item md={6}>
                    {servicesData.map((service, index) => (
                        <Box
                            key={index}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            gap={2}
                            sx={{ backgroundColor: grey[100], px: 4, py: 3, my: 3 }}
                            borderRadius={index % 2 === 0 ? "10px 10px 100px 10px" : "10px 100px 10px 10px"}>
                            <Box>
                                <Image src={service?.imageSrc} alt={service.title} width={50} />
                            </Box>
                            <Box>
                                <Typography variant="h6" fontWeight={700}>
                                    {service.title}
                                </Typography>
                                <Typography>{service.description}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Grid>

                <Grid item md={6}>
                    <Image src={chooseUsImg} alt="Why Us" width={480} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default WhyUs;
