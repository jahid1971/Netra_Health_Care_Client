"use client";

import { openModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Box, Button, IconButton } from "@mui/material";
import CreateSchedule from "./component/CreateSchedule";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import { useGetSchedulesQuery } from "@/redux/api/schedulesApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ISchedule } from "@/types/schedules";

const SchedulePage = () => {
    const [allSchedules, setAllSchedule] = useState<any>([]);
    const dispatch = useAppDispatch();

    const { data: schedules, isFetching } = useGetSchedulesQuery(undefined);

    useEffect(() => {
        const schedulesData = schedules?.data?.map((schedule: ISchedule, index: number) => ({
            sl: index + 1,
            id: schedule?.id,
            startDate: dayjs(schedule?.startDate).format("YYYY-MM-DD"),
            endDate: dayjs(schedule?.endDate).format("YYYY-MM-DD"),
            startTime: dayjs(schedule?.startDate).format("hh:mm a"),
            endTime: dayjs(schedule?.endDate).format("hh:mm a"),
        }));

        setAllSchedule(schedulesData);
    }, [schedules]);

    const columns: GridColDef[] = [
        { field: "sl", headerName: "SL" },
        { field: "startDate", headerName: "Date", flex: 1 },
        { field: "startTime", headerName: "Start Time", flex: 1 },
        { field: "endTime", headerName: "End Time", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <Button onClick={() => dispatch(openModal({modalId:"createSchedule"}))}>Create Schedule</Button>
            <CreateSchedule />
            <N_DataGrid
                rows={allSchedules}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
                hideFooter={false}
            />
        </Box>
    );
};

export default SchedulePage;
