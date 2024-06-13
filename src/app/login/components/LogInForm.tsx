"use client";
import GoogleLogin from "@/components/auth/GoogleLogin";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { authKey, refreshKey } from "@/constants/authKey";
import { baseUrl } from "@/constants/commmon";
import { deleteCookies } from "@/services/actions/cookies";

import { userLogIn } from "@/services/actions/userLogin";
import { storeToken } from "@/utils/localStorage";

import { tryCatch } from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const logInvalidationSchema = z.object({
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(1, "Password is required"),
});

const LogInForm = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect");


     const onSubmit = async (data: FieldValues) => {
        tryCatch(
            async () => {
                const res = await userLogIn(data);

                

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
        <N_Form
            onSubmit={onSubmit}
            resolver={zodResolver(logInvalidationSchema)}
            error={error}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, md: 2 }}
                mt={2}
            >
                <N_Input name="email" label="Email" type="email" />
                <N_Input name="password" label="Password" type="password" />
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

            <GoogleLogin redirectPath={redirectPath} />
        </N_Form>
    );
};

export default LogInForm;
