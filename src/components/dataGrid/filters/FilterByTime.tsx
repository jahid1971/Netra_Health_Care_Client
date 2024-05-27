import N_TimePicker from "@/components/forms/N_TimePicker";
import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";

const FilterByTime = ({ query, setQuery }) => {
    const [anchorEl, setaAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? "date-popover" : undefined;
    return (
        <Box>
            <Button
                size="small"
                variant={
                    open || query.startTime || query.endTime
                        ? "contained"
                        : "outlined"
                }
                aria-describedby={id}
                onClick={(e) => setaAnchorEl(e.currentTarget)}
            >
                filter by time
            </Button>

            <Popover
                onClose={() => setaAnchorEl(null)}
                open={open}
                anchorEl={anchorEl}
                id={id}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box p={2}>
                    <N_TimePicker
                        name="startTime"
                        label="Start Time"
                        setQuery={setQuery}
                        // disableDefaultDate={true}
                    />
                    <Box mt={2}>
                        <N_TimePicker
                            name="endTime"
                            label="End Time"
                            setQuery={setQuery}
                            // disableDefaultDate={true}
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default FilterByTime;
