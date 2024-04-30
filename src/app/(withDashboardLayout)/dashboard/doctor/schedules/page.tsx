"use client";
import { Box, Button, IconButton, Pagination } from "@mui/material";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import CreateDrSchedule from "./components/CreateDrSchedule";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridColDef } from "@mui/x-data-grid";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import { useGetSchedulesQuery } from "@/redux/api/schedulesApi";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { useMemo, useState } from "react";
import N_Pagination from "@/components/pagination/Pagination";

// import { useGetDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";

const doctorSchedulePage = () => {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isFetching } = useGetDoctorSchedulesQuery(query);
    const meta = data?.meta;

    console.log(data, "data");
    console.log(meta, "meta");

    const doctorSchedules = useMemo(() => {
        return data?.data?.map((schedule, index) => {

             const serial = (meta?.page - 1) * meta?.limit + index + 1
             console.log(serial,"sersil")
            return {
                sl:serial ,
                id: schedule?.scheduleId,
                startDate: dateFaormatter(schedule?.startDate),
                endDate: dateFaormatter(schedule?.endDate),
                startTime: timeFormatter(schedule?.startDate),
                endTime: timeFormatter(schedule?.endDate),
            };
        });
    }, [data]);

    const columns: GridColDef[] = [
        { field: "sl", headerName: "SL", flex: 1 },
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
            <Button
                onClick={() => dispatch(openModal({ modalId: "createDrSchedule" }))}
                endIcon={<AddIcon />}>
                Create Doctor Schedule
            </Button>
            <CreateDrSchedule />
            <N_DataGrid
                rows={doctorSchedules}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
                
            />
             <N_Pagination setQuery={setQuery} meta={meta} />
        </Box>
    );
};

export default doctorSchedulePage;
