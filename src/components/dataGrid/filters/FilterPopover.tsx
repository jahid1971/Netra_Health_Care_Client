import N_TimePicker from "@/components/forms/N_TimePicker";
import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";

const FilterPopover = ({
    filterLabel,
    children,
    btnBackgroundTrue,
    minWidth,
}: {
    filterLabel: string;
    children: React.ReactNode;
    btnBackgroundTrue: boolean;
    minWidth?: string;
}) => {
    const [anchorEl, setaAnchorEl] = useState<HTMLButtonElement | null>(null);
    // const open = Boolean(anchorEl);

    const [popContainer, setPopContainer] = useState("");

    const id = popContainer === filterLabel ? filterLabel : undefined;
    return (
        <Box>
            <Button
                size="small"
                variant={btnBackgroundTrue ? "contained" : "outlined"}
                aria-describedby={id}
                onClick={(e) => {
                    setaAnchorEl(e.currentTarget);
                    setPopContainer(filterLabel);
                }}
            >
                {filterLabel}
            </Button>

            <Popover
                onClose={() => {
                    setaAnchorEl(null);
                    setPopContainer("");
                }}
                open={popContainer === filterLabel}
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
                <Box
                    p={2}
                    minWidth={minWidth}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                >
                    {children}
                </Box>
            </Popover>
        </Box>
    );
};

export default FilterPopover;
