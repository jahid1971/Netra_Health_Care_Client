"use client";

import logo from "@/assets/svgs/logo.svg";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { tryCatch } from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, Box, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import CheckIcon from "@mui/icons-material/Check";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
    const router = useRouter();

    const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

    const onSubmit = async (data: FieldValues) => {
        await tryCatch(async () => forgotPassword(data), "", "Check your email for a password reset link");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                m: 3,
            }}>
            <Box boxShadow={1} maxWidth={600} width={"100%"} textAlign={"center"} p={{ xs: 2, lg: 5 }}>
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ "& svg": { width: 100, height: 100 } }}>
                        <KeyIcon sx={{ color: "primary.main" }} />
                    </Box>

                    <Typography variant="h6" fontWeight={600} >
                        Forgot Password
                    </Typography>
                </Stack>

                {!isSuccess ? (
                    <N_Form onSubmit={onSubmit} resolver={zodResolver(forgotPasswordSchema)}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 2 }} mt={2}>
                            <N_Input name="email" label="Email" type="email" />
                        </Stack>

                        <SubmitButton sx={{ my: 2 }} isLoading={isLoading} label="Forgot Password" />
                    </N_Form>
                ) : (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        An Email with reset password link was sent to your email
                    </Alert>
                )}
            </Box>
        </Box>
    );
};

export default ForgotPassword;
