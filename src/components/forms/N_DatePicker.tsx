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
    onFieldChange?: boolean;
    formatDateValue?: (date: any) => string;
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
        getValues
    } = methods ?? useFormContext() //eslint-disable-line

    const defaultValue = getValues(name) || dayjs(); //getValues(name) is for update previous date

    // const formattedDefaultValue = dayjs(new Date(defaultValue).toDateString());
    const formattedDefaultValue = null;

    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue={formattedDefaultValue}
                // defaultValue={!disableDefaultDate && formattedDefaultValue}
                render={({ field: { onChange, value, ...field } }) => {
                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label={label}
                                timezone="system"
                                disablePast={disablePast}
                                {...field}
                                onChange={(date) => {
                                    // onFieldChange &&
                                    //     setValue("onFieldChange", true);

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

                                    popper: {
                                        modifiers: [
                                            {
                                                name: "flip",
                                                enabled: true,
                                                options: {
                                                    altBoundary: true,
                                                    rootBoundary: "document",
                                                    padding: 8,
                                                },
                                            },
                                            {
                                                name: "preventOverflow",
                                                enabled: true,
                                                options: {
                                                    altAxis: true,
                                                    // altBoundary: true,
                                                    // tether: true,
                                                    rootBoundary: "document",
                                                    padding: 8,
                                                },
                                            },
                                        ],
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
