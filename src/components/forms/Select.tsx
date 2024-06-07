import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface ISelect {
    size?: "small" | "medium";
    placeholder?: string;
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: any;
    items: { label: string; value: any }[];
    setSelectedValue: any;
    selectedValue: any;
    variant?: "standard" | "outlined" | "filled";
    disableUnderline?: boolean;
}
export default function MuiSelect({
    items,
    label,
    size = "small",
    required,
    fullWidth = true,
    sx,
    setSelectedValue,
    selectedValue,
    variant = "standard",
    disableUnderline
}: ISelect) {
    const [value, setValue] = React.useState("");
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size={size} variant={variant}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    fullWidth={fullWidth}
                    // size={size}
                    required={required}
                    sx={{
                        ...sx,
                          fontSize: size === "small" ? "0.875rem" : "1rem"
                    }}
                    id="demo-simple-select"
                    value={selectedValue ? value : ""}
                  
                    onChange={(e) => {
                        setValue(e.target.value);
                        setSelectedValue(e.target.value);
                    }}
                    disableUnderline = {disableUnderline}
                >
                    {items.map((item) => (
                        <MenuItem key={item.value} value={item.value} >
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
