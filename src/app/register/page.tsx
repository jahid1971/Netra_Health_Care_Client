"use client";
import assets from "@/assets";
import GoogleLogin from "@/components/auth/GoogleLogin";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { authKey, refreshKey } from "@/constants/authKey";
import { deleteCookies } from "@/services/actions/cookies";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogIn } from "@/services/actions/userLogin";
import tryCatch from "@/utils/tryCatch";
import { registerPatientSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const RegisterPage = ({ searchParams }: any) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const redirectPath = searchParams.redirect;

    const onSubmit = async (data: FieldValues) => {
        const patientData = JSON.stringify(data);
        const formData = new FormData();
        formData.append("data", patientData);

        tryCatch(
            async () => {
                const registerResponse = await registerPatient(formData);
                console.log("🚀 ~ registerResponse:", registerResponse);

                if (registerResponse?.success) {
                    const logInRespone = await userLogIn({
                        email: data?.email,
                        password: data?.password,
                    });

                    if (logInRespone?.success) {
                        router.push("/dashboard");
                    } else {
                        setError(logInRespone?.message);
                        deleteCookies([authKey, refreshKey]);
                    }

                    return logInRespone;
                } else {
                    setError(registerResponse?.message);
                    return registerResponse;
                }
            },
            "Registering patient",
            "Patient registered successfully"
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
                    <Image src={assets.svgs.logo} alt="logo" width={50} />

                    <Typography variant="h6" fontWeight={600}>
                        Register Patient
                    </Typography>
                </Stack>

                <N_Form
                    onSubmit={onSubmit}
                    // resolver={zodResolver(registerPatientSchema)}
                    error={error}
                >
                    <Stack spacing={2} mt={2}>
                        <N_Input label="Name" name="name" />

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 2, md: 2 }}
                        >
                            <N_Input label="Email" type="email" name="email" />
                            <N_Input
                                label="Password"
                                type="password"
                                name="password"
                            />
                        </Stack>

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 2, md: 2 }}
                        >
                            <N_Input
                                label="Contact Number"
                                name="contactNumber"
                            />
                            <N_Input
                                label="Address"
                                size="small"
                                name="address"
                            />
                        </Stack>
                    </Stack>

                    <SubmitButton sx={{ my: 2 }} label="Register" />
                </N_Form>

                <GoogleLogin redirectPath={redirectPath} />

                <Typography variant="body2" fontWeight={300}>
                    Do you already have an account?
                    <Box
                        component={"span"}
                        color="primary.main"
                        fontWeight={700}
                    >
                        <Link href={`/login?redirect=${redirectPath}`}>
                            {" "}
                            Login
                        </Link>
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
