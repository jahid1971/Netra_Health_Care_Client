import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
    name: string;
    label?: string;
    type?: string;
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
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
}: TInputProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
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
                />
            )}
        />
    );
};

export default N_Input;
