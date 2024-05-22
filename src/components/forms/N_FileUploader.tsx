import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

type TProps = {
    name: string;
    label?: string;
    sx?: SxProps;
    variant?: "contained" | "outlined" | "text";
};

export default function N_FileUploader({
    name,
    label,
    sx,
    variant = "outlined",
}: TProps) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ...field } }) => {
                return (
                    <Button
                        fullWidth
                        variant={variant}
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ ...sx }}
                    >
                        {label || "Upload file"}
                        <Input
                            {...field}
                            type={name}
                            value={value?.fileName}
                            onChange={(e) =>
                                onChange(
                                    (e?.target as HTMLInputElement).files?.[0]
                                )
                            }
                            style={{ display: "none" }}
                        />
                    </Button>
                );
            }}
        />
    );
}
