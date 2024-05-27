import N_DatePicker from "@/components/forms/N_DatePicker";
import { Box, Button, Popover } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

const FilterByDate = ({ query }) => {
    const [dateAnchorEl, setDateAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );
    const datePopoverOpen = Boolean(dateAnchorEl);
    const datepopoverId = datePopoverOpen ? "date-popover" : undefined;
    return (
        <Box>
            <Button
                size="small"
                variant={
                    datePopoverOpen || query.startDate
                        ? "contained"
                        : "outlined"
                }
                aria-describedby={datepopoverId}
                onClick={(e) => setDateAnchorEl(e.currentTarget)}
            >
                filter by date
            </Button>

            <Popover
                onClose={() => setDateAnchorEl(null)}
                open={datePopoverOpen}
                anchorEl={dateAnchorEl}
                id={datepopoverId}
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
                    <N_DatePicker
                        name="startDate"
                        label="Start Date"
                        disablePast={false}
                        disableDefaultDate={true}
                        formatDateValue={(date: string) =>
                            dayjs(date).startOf("day").toISOString()
                        }
                    />
                    <Box mt={2}>
                        <N_DatePicker
                            name="endDate"
                            label="End Date"
                            disablePast={false}
                            disableDefaultDate={true}
                            formatDateValue={(date: string) =>
                                dayjs(date).endOf("day").toISOString()
                            }
                        />
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default FilterByDate;
