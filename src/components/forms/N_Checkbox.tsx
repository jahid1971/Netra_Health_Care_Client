import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

export interface ICheckbox {
    name: string;
    label: string;
    methods?: any;
    defaultValue?: boolean;
}

const N_Checkbox = ({ name, label, methods, defaultValue }: ICheckbox) => {
    const { control, formState, getValues } = methods ?? useFormContext();

    // const currentValue = true;
    return (
        <Controller
            control={control}
            name={name}
            // defaultValue={currentValue}
            render={({ field: { value, ...field } }) => (
                <FormControlLabel
                    control={<Checkbox {...field} defaultChecked={value} />}
                    label={label}
                />
            )}
        />
    );
};

export default N_Checkbox;
