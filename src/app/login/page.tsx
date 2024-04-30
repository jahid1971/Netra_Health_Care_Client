"use client";
import logo from "@/assets/svgs/logo.svg";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LogInForm from "./LogInForm";

const LogInPage = () => {
    return (
        <Container
            sx={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                spacing: 2,
            }}>
            <Box boxShadow={1} maxWidth={600} width={"100%"} textAlign={"center"} p={5}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Image src={logo} alt="logo" />

                    <Typography variant="h6" fontWeight={600}>
                        Login Netra HealthCare
                    </Typography>
                </Stack>

                <LogInForm />

                <Typography variant="body2" fontWeight={300}>
                    Don&apos;t have an account?
                    <Box component={"span"} color="primary.main" fontWeight={600}>
                        <Link href="/register"> Create an account</Link>
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
};

export default LogInPage;
