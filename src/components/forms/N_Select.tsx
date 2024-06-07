import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SxProps,
    TextField,
} from "@mui/material";
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
    variant?: "standard" | "outlined" | "filled";
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
    variant,
}: ITextField) => {
    const { control, formState } = methods ?? useFormContext(); //eslint-disable-line
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <FormControl fullWidth size={size} variant={variant}>
                    <InputLabel id="select-label">{label}</InputLabel>
                    <Select
                        labelId="select-label"
                        {...field}
                        sx={{
                            ...sx,
                            fontSize: size === "small" ? "0.875rem" : "1rem",
                        }}
                        size={size}
                        label={label}
                        required={required}
                        fullWidth={fullWidth}
                        error={isError}

                        // onChange={(e) => field.onChange(e.target.value)}
                    >
                        {items.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {isError && (
                        <FormHelperText error>
                            {formState.errors[name]?.message as string}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};

export default N_Select;
