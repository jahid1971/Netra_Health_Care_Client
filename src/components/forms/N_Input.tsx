import { IconButton, InputAdornment, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { isTypedArray } from "util/types";

type TInputProps = {
    name: string;
    label?: string;
    type?: "text" | "number" | "password" | "email";
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
    multiline?: boolean;
    rows?: number;
    onFieldChange?: boolean;
};

const N_Input = ({
    name,
    label,
    type = "text",
    size = "small",
    fullWidth = true,
    sx,
    required,
    placeholder,
    multiline,
    rows = 4,
    defaultValue,
    onFieldChange,
}: TInputProps) => {
    const { control, getValues } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || ""}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    value={field.value || ""}
                    sx={{ ...sx }}
                    label={label}
                    type={type}
                    variant="outlined"
                    size={size}
                    fullWidth={fullWidth}
                    placeholder={placeholder || label}
                    required={required}
                    error={!!error?.message}
                    helperText={error?.message}
                    multiline={multiline}
                    rows={multiline && rows ? rows : 1}
                    // InputProps={{
                    //     type: type,
                    // }}
                    // onChange={(e) => {
                    //     field.onChange(e.target.value);
                    //     if (onFieldChange) {
                    //         setValue("onFieldChange", true);
                    //     }
                    // }}
                />
            )}
        />
    );
};

export default N_Input;
