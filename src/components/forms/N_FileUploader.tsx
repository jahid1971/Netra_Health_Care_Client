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
    const [fileName, setFileName] = React.useState<string>("");
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
                        sx={{
                            ...sx,
                            maxWidth: "200px",
                            display: "inline-flex",
                            alignItems: "center",
                            overflow: "hidden",
                            "& > span": {
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            },
                            whiteSpace: "nowrap",
                        }}
                    >
                        {fileName || label || "Upload file"}
                        <Input
                            {...field}
                            type="file"
                            // value={value?.fileName}
                            onChange={(e) => {
                                onChange(
                                    (e?.target as HTMLInputElement).files?.[0]
                                );
                                setFileName(
                                    (e?.target as HTMLInputElement).files?.[0]
                                        ?.name || ""
                                );
                            }}
                            style={{ display: "none" }}
                        />
                    </Button>
                );
            }}
        />
    );
}
