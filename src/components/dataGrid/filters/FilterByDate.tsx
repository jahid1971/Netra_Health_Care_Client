import N_DatePicker from "@/components/forms/N_DatePicker";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import FilterPopover from "./FilterPopover";

const FilterByDate = ({ query }: any) => {
    return (
        <FilterPopover
            filterLabel={"Filter By Date"}
            btnBackgroundTrue={query.startDate || query.endDate}
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
        </FilterPopover>
    );
};

export default FilterByDate;
