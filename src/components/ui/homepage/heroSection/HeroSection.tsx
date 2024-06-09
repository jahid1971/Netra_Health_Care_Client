import assets from "@/assets";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    return (
        <Container sx={{ display: "flex", direction: "row", my: 16 }}>
            <Box sx={{ position: "relative", flex: 1 }}>
                <Box
                    sx={{
                        position: "absolute",
                        width: "700px",
                        left: "-90px",
                        top: "-120px",
                    }}
                >
                    <Image src={assets.svgs.grid} alt="doctor1" />
                </Box>

                <Typography variant="h2" component="h1" fontWeight={600}>
                    Healthier Hearts
                </Typography>
                <Typography variant="h2" component="h1" fontWeight={600}>
                    Come From
                </Typography>
                <Typography
                    variant="h2"
                    component="h1"
                    fontWeight={600}
                    color="primary.main"
                >
                    Preventive Care
                </Typography>
                <Typography sx={{ my: 4 }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Fugit eum iusto consequatur eius, doloribus nesciunt facere
                    aliquid eveniet et. Rerum maiores saepe cupiditate repellat
                    recusandae atque sed. Saepe, vitae id?
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Link href="/dashboard">
                        <Button>Make Appointment </Button>
                    </Link>
                    <Button variant="outlined">Contact us </Button>
                </Box>
            </Box>

            <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
                <Box sx={{ position: "absolute", left: "180px", top: "-30px" }}>
                    <Image
                        src={assets.svgs.arrow}
                        width={100}
                        height={100}
                        alt="arrow"
                    />
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box sx={{ mt: 4 }}>
                        <Image
                            src={assets.images.doctor1}
                            width={240}
                            height={380}
                            alt="doctor1"
                        />
                    </Box>
                    <Box>
                        <Image
                            src={assets.images.doctor2}
                            width={240}
                            height={300}
                            alt="doctor2"
                        />
                    </Box>
                </Box>
                <Box sx={{ position: "absolute", top: "230px", left: "120px" }}>
                    <Image
                        src={assets.images.doctor3}
                        width={240}
                        height={240}
                        alt="doctor3"
                    />
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "-60px",
                        right: "40px",
                        zIndex: "-1",
                    }}
                >
                    <Image
                        src={assets.images.stethoscope}
                        width={180}
                        height={180}
                        alt="stethoscope"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default HeroSection;
