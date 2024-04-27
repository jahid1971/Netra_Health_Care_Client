"use client";
import assets from "@/assets";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";


import { storeUserInfo } from "@/services/actions/auth.services";
import { userLogIn } from "@/services/actions/userLogin";
import tryCatch from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const logInvalidationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(1, "Password is required"),
});

const LogInPage = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const res = await userLogIn(data);
                if (res?.data?.accessToken) {
                    storeUserInfo(res?.data?.accessToken);
                    // router.push("/dashboard");
                } else setError(res?.message);
                return res;
            },
            "Logged in successfully",
            "Logging in"
        );
    };

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
                    <Image src={assets.svgs.logo} alt="logo" />

                    <Typography variant="h6" fontWeight={600}>
                        Login Netra HealthCare
                    </Typography>
                </Stack>

                <N_Form onSubmit={onSubmit} resolver={zodResolver(logInvalidationSchema)} error={error}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 2 }} mt={2}>
                        <N_Input name="email" label="Email" type="email" />
                        <N_Input name="password" label="Password" type="password" />
                    </Stack>

                    <Typography textAlign={"right"} variant="body2" mt={1}>
                        Forgot password?
                    </Typography>

                    <Button type="submit" sx={{ my: 2 }} fullWidth>
                        LOG IN
                    </Button>
                </N_Form>

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
