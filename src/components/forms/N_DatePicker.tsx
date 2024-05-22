import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
    name: string;
    size?: "small" | "medium";
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
    methods?: any;
    disablePast?: boolean;
}

const N_DatePicker = ({
    name,
    size = "small",
    label,
    required,
    fullWidth = true,
    sx,
    methods,
    disablePast = true,
}: IDatePicker) => {
    const {
        control,
        formState: { errors },
        getValues,
    } = methods ?? useFormContext();

    const defaultValue = getValues(name) || dayjs(); //getValues(name) is for update previous date

    const formattedDefaultValue = dayjs(new Date(defaultValue).toDateString());

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={formattedDefaultValue}
                render={({ field: { onChange, value, ...field } }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label={label}
                                timezone="system"
                                disablePast={disablePast}
                                {...field}
                                onChange={(date) => onChange(date)}
                                value={
                                    value
                                        ? dayjs(new Date(value).toDateString())
                                        : formattedDefaultValue
                                }
                                slotProps={{
                                    textField: {
                                        required: required,
                                        size: size,
                                        sx: {
                                            ...sx,
                                        },
                                        variant: "outlined",
                                        fullWidth: fullWidth,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    );
                }}
            />
            {errors[name] && (
                <Typography variant="body2" color="error">
                    {errors[name]?.message}
                </Typography>
            )}
        </>
    );
};

export default N_DatePicker;
