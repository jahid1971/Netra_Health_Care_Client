import { IconButton, InputAdornment, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { blue } from "@mui/material/colors";

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
    isLoading?: boolean;
    editable?: boolean;
    autoSubmitOnBlur?: boolean;
};

const Edit_Input = ({
    name,
    label,
    type = "text",
    size = "small",
    fullWidth = true,
    sx,
    required,
    multiline,
    rows = 4,
    defaultValue,
    isLoading,
    editable = true,
    autoSubmitOnBlur = true,
}: TInputProps) => {
    const { control } = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);
    const saveButtonRef = useRef<HTMLButtonElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        inputRef.current?.focus();
        setIsFocused(true);
    };



    useEffect(() => {
        const handleBlur = () => {
            setIsFocused(false);
            if (autoSubmitOnBlur && !isLoading) {
                setTimeout(() => {
                    saveButtonRef.current?.click();
                }, 0);
            }
        };

        const currentInputRef = inputRef.current;

        if (autoSubmitOnBlur && isFocused && !isLoading) {
            currentInputRef?.addEventListener("blur", handleBlur);
        } else {
            currentInputRef?.removeEventListener("blur", handleBlur);
        }

        return () => {
            currentInputRef?.removeEventListener("blur", handleBlur); 
        };
    }, [autoSubmitOnBlur, isLoading, isFocused]);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue || ""}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    placeholder=""
                    {...field}
                    value={field.value || ""}
                    sx={{
                        ...sx,

                        "& .MuiInputBase-root": {
                            pointerEvents: "none",
                            paddingLeft: "13px",
                            paddingTop: "20px",
                            backgroundColor: "white",
                        },

                        "& .MuiInputAdornment-root": {
                            pointerEvents: "auto",
                        },
                        "& fieldset": { border: "none" },
                        "&:focus-within fieldset": {
                            border: `1px solid ${blue[400]}`,
                        },

                        "& .MuiFormLabel-root": {
                            fontSize: "18px",
                            color: blue[400],
                            position: "absolute",
                            top: "12px",
                            left: "15px",
                            pointerEvents: "none",
                            transition:
                                "top 0.3s ease-in-out, left 0.3s ease-in-out",
                            "&.Mui-focused": {
                                top: "0px",
                                left: "0px",
                            },
                        },
                    }}
                    label={label}
                    type={type}
                    variant="outlined"
                    size={size}
                    fullWidth={fullWidth}
                    required={required}
                    error={!!error?.message}
                    helperText={error?.message}
                    multiline={multiline}
                    rows={multiline && rows ? rows : 1}
                    inputRef={inputRef}
                    InputProps={{
                        endAdornment: editable && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleIconClick}
                                    edge="end"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    sx={{ mx: 5 }}
                                    type="submit"
                                    disabled={isLoading}
                                    ref={saveButtonRef}
                                >
                                    <SaveIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
};

export default Edit_Input;
