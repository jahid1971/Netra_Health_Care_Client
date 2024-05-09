"use client";

import { openModal } from "@/redux/slices/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Box, Button, IconButton } from "@mui/material";
import CreateSchedule from "./component/CreateSchedule";
import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import {
    useDeleteScheduleMutation,
    useGetSchedulesQuery,
} from "@/redux/api/schedulesApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ISchedule, TSchedule } from "@/types/schedules";
import N_Pagination from "@/components/pagination/Pagination";
import { tryCatch } from "@/utils/tryCatch";

const SchedulePage = () => {
    const [allSchedules, setAllSchedule] = useState<any>([]);
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<Record<string, any>>({
        sortBy: "startDateTime",
        sortOrder: "asc",
    });

    const { data, isFetching } = useGetSchedulesQuery(query);

    const [deleteSchedule] = useDeleteScheduleMutation();

    const schedules = data?.data

    const meta = data?.meta;

 

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deleteSchedule(id),
            "Deleting Schedule",
            "Schedule Deleted Successfully"
        );
    };


    useEffect(() => {
        const schedulesData = schedules?.map(
            (schedule: TSchedule, index: number) => ({
                sl: (query.page - 1) * query.limit + index + 1 + ".",
                id: schedule?.id,
                scheduleDate: schedule?.startDateTime,
                startTime: schedule?.startDateTime,
                endTime: schedule?.endDateTime,
            })
        );
        setAllSchedule(schedulesData);
    }, [schedules]);

    console.log(allSchedules, "allSchedules");

    const columns: GridColDef[] = [
        {
            field: "sl",
            headerName: "SL",
            width: 80,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "scheduleDate",
            headerName: "Date",
            flex: 1,
            type: "date",
            valueFormatter: (param) => dayjs(param).format("DD-MM-YYYY"),
        },
        {
            field: "startTime",
            headerName: "Start Time",
            flex: 1,
            type: "dateTime",
            valueFormatter: (param) => dayjs(param).format("hh:mm A"),
        },
        {
            field: "endTime",
            headerName: "End Time",
            flex: 1,
            type: "dateTime",
            valueFormatter: (param) => dayjs(param).format("hh:mm A"),
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <Button
                size="small"
                onClick={() =>
                    dispatch(openModal({ modalId: "createSchedule" }))
                }>
                Create Schedule
            </Button>
            <CreateSchedule />
            <N_DataGrid
                rows={allSchedules}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
                setQuery={setQuery}
            />
            <N_Pagination setQuery={setQuery} meta={meta} />
        </Box>
    );
};

export default SchedulePage;
