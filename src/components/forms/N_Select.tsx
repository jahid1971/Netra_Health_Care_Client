import { MenuItem, SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
    name: string;
    size?: "small" | "medium";
    placeholder?: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    items: { label: string; value: any }[];
    methods?: any;
}

const N_Select = ({
    items,
    name,
    label,
    size = "small",
    required,
    fullWidth = true,
    sx,
    methods,
}: ITextField) => {
    const { control, formState } = methods ?? useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...field}
                    sx={{
                        ...sx,
                    }}
                    size={size}
                    select
                    label={label}
                    required={required}
                    fullWidth={fullWidth}
                    error={isError}
                    helperText={isError ? (formState.errors[name]?.message as string) : ""}>
                    {items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};

export default N_Select;
