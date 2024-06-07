import N_TimePicker from "@/components/forms/N_TimePicker";
import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";
import FilterPopover from "./FilterPopover";

const FilterByTime = ({ query, setQuery }: any) => {
    return (
        <FilterPopover
            filterLabel={"Filter By Time"}
            btnBackgroundTrue={query.startTime || query.endTime}
        >
            <Box p={2}>
                <N_TimePicker
                    name="startTime"
                    label="Start Time"
                    setQuery={setQuery}
                />
                <Box mt={2}>
                    <N_TimePicker
                        name="endTime"
                        label="End Time"
                        setQuery={setQuery}
                    />
                </Box>
            </Box>
        </FilterPopover>
    );
};

export default FilterByTime;
