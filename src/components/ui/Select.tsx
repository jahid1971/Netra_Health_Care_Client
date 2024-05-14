import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/material";

export default function CustomSelect({ items, setValue, value, label, sx }) {
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <Box sx={sx}>
            <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 100 }}
                size="small"
            >
                {label && (
                    <InputLabel id="demo-simple-select-autowidth-label">
                        {label}
                    </InputLabel>
                )}
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={handleChange}
                    autoWidth
                    label="Age"
                >
                    {items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
