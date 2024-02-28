"use client";
import { Box, Button } from "@mui/material";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/features/modal/modalSlice";
import CreateDrSchedule from "./components/CreateDrSchedule";

const doctorSchedulePage = () => {
    const dispatch = useAppDispatch();
    return (
        <Box>
            <Button onClick={() => dispatch(openModal({ modalId: "createDrSchedule" }))}>
                Create Doctor Schedule
            </Button>
            <CreateDrSchedule />
        </Box>
    );
};

export default doctorSchedulePage;
