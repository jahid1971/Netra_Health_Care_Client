"use client";

import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { tryCatch } from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Stack, Typography } from "@mui/material";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import KeyIcon from "@mui/icons-material/Key";
import { useResetPasswordMutation } from "@/redux/api/authApi";

import { authKey, refreshKey } from "@/constants/authKey";
import { deleteCookies, setTokenToCookies } from "@/services/actions/cookies";
import { resePasswordSchema } from "@/utils/validationSchemas";

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");
    const router = useRouter();

    const [resetPassword] = useResetPasswordMutation();

    useEffect(() => {
        if (!token || !id) return router.push("/forgot-password");
        setTokenToCookies(authKey, token);
    }, [token, id, router]);

    const onSubmit = async (data: FieldValues) => {
        const updatedData = { ...data, id };

        await tryCatch(
            async () => await resetPassword(updatedData),
            "Password Reseting",
            "Password Reset Successful",
            async () => {
                await deleteCookies([authKey, refreshKey]),
                    router.push("/login");
            }
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                m: 3,
            }}
        >
            <Box
                boxShadow={1}
                maxWidth={600}
                width={"100%"}
                textAlign={"center"}
                p={{ xs: 2, lg: 5 }}
            >
                <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ "& svg": { width: 100, height: 100 } }}>
                        <KeyIcon sx={{ color: "primary.main" }} />
                    </Box>

                    <Typography variant="h6" fontWeight={600}>
                        Reset Password
                    </Typography>
                </Stack>

                <N_Form
                    onSubmit={onSubmit}
                    resolver={zodResolver(resePasswordSchema)}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 2 }}
                        mt={2}
                    >
                        <N_Input
                            name="newPassword"
                            label="New Password"
                            type="password"
                        />
                        <N_Input
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                        />
                    </Stack>

                    <SubmitButton sx={{ my: 2 }} label="Reset Password" />
                </N_Form>
            </Box>
        </Box>
    );
};

export default ResetPassword;
