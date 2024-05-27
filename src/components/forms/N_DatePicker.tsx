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
    disableDefaultDate?: boolean;
    onFieldChange: boolean;
    formatDateValue?: (date: string) => string;
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
    disableDefaultDate = false,
    formatDateValue,
    onFieldChange = true,
}: IDatePicker) => {
    const {
        control,
        formState: { errors },
        getValues,
        setValue,
    } = methods ?? useFormContext();

    const defaultValue = getValues(name) || dayjs(); //getValues(name) is for update previous date

    const formattedDefaultValue = dayjs(new Date(defaultValue).toDateString());

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={!disableDefaultDate && formattedDefaultValue}
                render={({ field: { onChange, value, ...field } }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label={label}
                                timezone="system"
                                disablePast={disablePast}
                                {...field}
                                onChange={(date) => {
                                    onFieldChange &&
                                        setValue("onFieldChange", true);

                                    onChange(
                                        date
                                            ? formatDateValue
                                                ? formatDateValue(date)
                                                : date.toISOString()
                                            : null
                                    );
                                }}
                                value={
                                    value
                                        ? dayjs(new Date(value).toDateString())
                                        : disableDefaultDate
                                        ? null
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
