"use client";

import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { tryCatch } from "@/utils/tryCatch";
import { zodResolver } from "@hookform/resolvers/zod";

import { Box, Stack, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logOutUser } from "@/services/actions/logOutuser";
import { changePasswordSchema } from "@/utils/validationSchemas";

// .refine((data) => data.oldPassword !== data.newPassword, {
//     message: "New password must be different from old password",
//     path: ["newPassword"],
// });

const ChangePassword = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const [changePassword] = useChangePasswordMutation();

    const onSubmit = async (data: FieldValues) => {
        await tryCatch(
            async () => changePassword(data),
            "Changing password",
            "Password changed successfully",
            () => {
                logOutUser(router, { toastFalse: true });
            }
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // spacing: 2,
                mt: 2,
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
                        Change Password
                    </Typography>
                </Stack>

                <N_Form
                    onSubmit={onSubmit}
                    resolver={zodResolver(changePasswordSchema)}
                    error={error}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 2, md: 2 }}
                        mt={2}
                    >
                        <N_Input
                            name="oldPassword"
                            label="Old Password"
                            type="password"
                        />
                        <N_Input
                            name="newPassword"
                            label="New Password"
                            type="password"
                        />
                    </Stack>

                    <Link href={"/forgot-password"}>
                        <Typography
                            textAlign={"left"}
                            variant="body2"
                            mt={1}
                            color={"primary"}
                        >
                            Forgot password?
                        </Typography>
                    </Link>

                    <SubmitButton sx={{ my: 2 }} label="Change Password" />
                </N_Form>
            </Box>
        </Box>
    );
};

export default ChangePassword;
