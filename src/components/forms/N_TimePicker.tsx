import React from "react";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

interface ITimePicker {
    name: string;
    size?: "small" | "medium";
    placeholder?: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    onFieldChange?: boolean;
    setQuery?: any;
}

const N_TimePicker = ({
    name,
    label,
    size = "small",
    required,
    fullWidth = true,
    sx,
    onFieldChange = false,
    setQuery,
}: ITimePicker) => {
    dayjs.extend(utc);
    const { control, formState, setValue } = useFormContext();
    const isError = formState.errors[name] !== undefined;
    const defaultValue = dayjs(new Date().toDateString());

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { onChange, value, ...field } }) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            {...field}
                            label={label}
                            value={value || defaultValue}
                            onChange={(time) => {
                                // onFieldChange &&
                                //     setValue("onFieldChange", true);

                                setQuery
                                    ? setQuery((prev: any) => ({
                                          ...prev,
                                          [name]: dayjs(time)
                                              .utc()
                                              .format("HH:mm:ss"),
                                      }))
                                    : onChange(time);
                            }}
                            timezone="system"
                            slotProps={{
                                textField: {
                                    required: required,
                                    fullWidth: fullWidth,
                                    size: size,
                                    sx: {
                                        ...sx,
                                    },
                                    variant: "outlined",
                                    error: isError,
                                    helperText: isError
                                        ? (formState.errors[name]
                                              ?.message as string)
                                        : "",
                                },
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
};

export default N_TimePicker;
