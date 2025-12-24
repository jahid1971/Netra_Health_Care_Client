"use client";
import logo from "@/assets/svgs/logo.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "@/components/ui/SubmitButton";
import GoogleLogin from "@/components/auth/GoogleLogin";
import N_Input from "@/components/forms/N_Input";
import N_Form from "@/components/forms/N_Form";
import { authKey, refreshKey } from "@/constants/authKey";
import { deleteCookies } from "@/services/actions/cookies";
import { userLogIn } from "@/services/actions/userLogin";
import { tryCatch } from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { logInvalidationSchema } from "./components/LogInForm";

const LogInPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect");

    const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const res = await userLogIn(data);

                console.log("res ---------------", res);

                if (res?.success) {
                    redirectPath
                        ? router.push(redirectPath)
                        : router.push("/dashboard");
                } else {
                    setError(res?.message);
                    deleteCookies([authKey, refreshKey]);
                }
                return res;
            },
            "Logging in",
            "Logged in successfully"
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
            }}
        >
            <Box
                boxShadow={1}
                maxWidth={600}
                width={"100%"}
                textAlign={"center"}
                p={5}
            >
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Image src={logo} alt="logo" width={50} />

                    <Typography variant="h6" fontWeight={600}>
                        Login Netra HealthCare
                    </Typography>
                </Stack>

                <N_Form
                    onSubmit={onSubmit}
                    resolver={zodResolver(logInvalidationSchema)}
                    error={error}
                    defaultValues={{
                        email: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL,
                        password: process.env.NEXT_PUBLIC_SUPER_ADMIN_PASSWORD,
                    }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 2 }}
                        mt={2}
                    >
                        <N_Input name="email" label="Email" type="email" />
                        <N_Input
                            name="password"
                            label="Password"
                            type="password"
                        />
                    </Stack>

                    <Link href="/forgot-password">
                        <Typography
                            textAlign={"right"}
                            variant="body2"
                            mt={1}
                            color="primary"
                        >
                            Forgot password?
                        </Typography>
                    </Link>

                    <SubmitButton sx={{ my: 2 }} label="Log in" />
                </N_Form>

                <GoogleLogin redirectPath={redirectPath} />

                <Typography variant="body2" fontWeight={300} mt={0.5}>
                    Don&apos;t have an account?
                    <Box
                        component={"span"}
                        color="primary.main"
                        fontWeight={600}
                    >
                        <Link href={`/register?redirect=${redirectPath}`}>
                            {" "}
                            Create an account
                        </Link>
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
};

export default LogInPage;
