import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";

const Footer = () => {
    return (
        <Box bgcolor="rgb(17,26,34)" py={5}>
            <Container>
                <Stack direction={"row"} justifyContent="center" gap={4}>
                    <Typography
                        color="#fff"
                        component={Link}
                        href="/consultation"
                        sx={{ textDecoration: "none" }}>
                        Consultation
                    </Typography>
                    <Typography color="#fff">Health Plans</Typography>
                    <Typography color="#fff">Medicine</Typography>
                    <Typography color="#fff">Diagnostics</Typography>
                    <Typography color="#fff">NGOs</Typography>
                </Stack>
                <Stack direction={"row"} justifyContent="center" gap={2} py={3}>
                    <Image src={facebookIcon} alt="facebook" width={30} height={30} />
                    <Image src={facebookIcon} alt="facebook" width={30} height={30} />
                    <Image src={facebookIcon} alt="facebook" width={30} height={30} />
                    <Image src={facebookIcon} alt="facebook" width={30} height={30} />
                </Stack>
                <Box
                    sx={{
                        borderBottom: "1px dashed",
                        color: "#fff",
                    }}
                />
                <Stack direction={"row"} justifyContent="space-between" alignItems={"center"} gap={2} py={3}>
                    <Typography color="white" variant="body2">
                        &copy;2024 Netra HealthCare. All Rights Reserved.
                    </Typography>

                    <Typography variant="h5" component={Link} href="/" fontWeight={600} color={"white"}>
                        NE
                        <Box component="span" color="primary.main">
                            TRA
                        </Box>{" "}
                        Health Care
                    </Typography>

                    <Typography variant="body2" color="white" >
                        Privacy Policy! Terms & Conditions
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;