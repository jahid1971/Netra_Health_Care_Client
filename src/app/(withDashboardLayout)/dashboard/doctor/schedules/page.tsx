"use client";
import { Box, Button, IconButton, Pagination } from "@mui/material";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import CreateDrSchedule from "./components/CreateDrSchedule";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { GridColDef } from "@mui/x-data-grid";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import {
    useDeleteDoctorScheduleMutation,
    useGetMySchedulesQuery,
} from "@/redux/api/doctorScheduleApi";
import { useGetSchedulesQuery } from "@/redux/api/schedulesApi";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { useMemo, useState } from "react";
import N_Pagination from "@/components/pagination/Pagination";
import { tryCatch } from "@/utils/tryCatch";
import { ISchedule, TDoctorSchedule } from "@/types/schedules";
import tableSerial from "@/utils/tableSerial";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

const doctorSchedulePage = () => {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isLoading } = useGetMySchedulesQuery(query);

    const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deleteDoctorSchedule(id),
            "Deleting doctor Schedule",
            " Doctor Schedule Deleted Successfully"
        );
    };

    const meta = data?.meta;

    const doctorSchedules =
        useMemo(() => {
            return data?.data?.map((item: TDoctorSchedule, index) => {
                return {
                    sl: tableSerial(meta, index),
                    id: item?.scheduleId,
                    startDate: dateFaormatter(item?.schedule?.startDateTime),
                    // endDate: dateFaormatter(item?.schedule?.endDateTime),
                    startTime: timeFormatter(item?.schedule?.startDateTime),
                    endTime: timeFormatter(item?.schedule?.endDateTime),
                };
            });
        }, [data, query]) || [];

    const columns: GridColDef[] = [
        {
            field: "sl",
            headerName: "SL",
            headerAlign: "center",
            width: 130,
            align: "center",
        },
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
                    <IconButton
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "confirm",
                                    modalData: () =>
                                        handleDelete(row.id as string),
                                })
                            )
                        }
                        aria-label="delete"
                    >
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <Button
                onClick={() =>
                    dispatch(openModal({ modalId: "createDrSchedule" }))
                }
                endIcon={<AddIcon />}
            >
                Create Doctor Schedule
            </Button>

            <N_DataGrid
                setQuery={setQuery}
                rows={doctorSchedules}
                columns={columns}
                isLoading={isLoading}
                notFoundFor="Schedule"
                meta={meta}
            />

            {!isLoading && <CreateDrSchedule />}
            <ConfirmationModal title="Do you want to delete this?" />
        </Box>
    );
};

export default doctorSchedulePage;
