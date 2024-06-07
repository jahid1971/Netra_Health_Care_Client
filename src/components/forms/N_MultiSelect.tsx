import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, ListItemText, Typography } from "@mui/material";

type TMultiselect = {
    name: string;
    items: { label: string; value: any }[];
    label: string;
    methods?: any;
    disabled?: boolean;
    required?: boolean;
    size?: "small" | "medium";
    defaultValue?: any[];
};


export default function N_MultiSelect({
    name,
    items,
    label,
    disabled,
    required = true,
    methods,
    size = "small",
    defaultValue = [],
}: TMultiselect) {
    const {
        control,
        formState: { errors },
    } = methods ?? useFormContext(); //eslint-disable-line

    const valueToLabelMap = items?.reduce<Record<any, string>>((acc, item) => {
        acc[item.value] = item.label;
        return acc;
    }, {});

    return (
        <FormControl sx={{ width: "100%" }} size={size}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={{ required: required ? `${label} is required` : false }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        labelId={`${name}-label`}
                        id={name}
                        multiple
                        value={value || []}
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                        input={<OutlinedInput id={name} label={label} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                                {selected?.map((value: any) => (
                                    
                                    <Box key={value}> {valueToLabelMap?.[value]},</Box>
                                ))}
                            </Box>
                        )}
                        disabled={disabled}

                        // MenuProps={MenuProps}
                    >
                        {items?.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                <Checkbox checked={value.indexOf(item.value) > -1} />
                                <ListItemText primary={item.label} />
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors[name] && (
                <Typography variant="body2" color="error">
                    {errors[name]?.message}
                </Typography>
            )}
        </FormControl>
    );
}
