"use client";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Box, Button, Input, SvgIconProps, SxProps } from "@mui/material";
import { ReactElement } from "react";

interface IFileUploadButton {
    name: string;
    label?: string;
    accept?: string;
    sx?: SxProps;
    icon?: ReactElement<SvgIconProps>;
    variant?: "text" | "outlined" | "contained";
    onFileUpload: (file: File) => void;
    fullWidth?: boolean;
    isLoading?: boolean;
    size?: "small" | "medium" | "large";
}

const AutoFileUploader = ({
    name,
    label,
    accept = "image/*",
    sx,
    icon,
    variant = "contained",
    onFileUpload,
    fullWidth = true,
    isLoading,
    size,
}: IFileUploadButton) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant={variant}
            tabIndex={-1}
            startIcon={icon ? icon : <CloudUploadIcon />}
            sx={{ ...sx }}
            fullWidth={fullWidth}
            disabled={isLoading}
            size={size ? size : "medium"}
        >
            {isLoading ? "Uploading..." : label || "Upload file"}
            <Input
                type="file"
                inputProps={{ accept: accept }}
                style={{ display: "none" }}
                onChange={(e) => {
                    const fileInput = e.target as HTMLInputElement;
                    const file = fileInput.files?.[0];
                    if (file) {
                        onFileUpload(file);
                    }
                }}
            />
        </Button>
    );
};

export default AutoFileUploader;
