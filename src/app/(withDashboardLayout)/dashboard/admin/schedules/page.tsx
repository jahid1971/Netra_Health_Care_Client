"use client";
import { openModal } from "@/redux/slices/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Box, Button, IconButton, Popover, Stack } from "@mui/material";
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
import { TSchedule } from "@/types/schedules";
import { tryCatch } from "@/utils/tryCatch";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

import FilterByDate from "@/components/dataGrid/filters/FilterByDate";
import FilterByTime from "@/components/dataGrid/filters/FilterByTime";


const SchedulePage = () => {
    const [allSchedules, setAllSchedule] = useState<any>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isFetching } = useGetSchedulesQuery(query);

    const [deleteSchedule] = useDeleteScheduleMutation();

    const schedules = data?.data;

    const meta = data?.meta;

    const handleDelete = (ids: string | string[]) => {
        tryCatch(
            async () =>
                await deleteSchedule({
                    data: Array.isArray(ids) ? ids : [ids],
                }),
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
    }, [schedules, query]);

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
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "confirm",
                                    modalData: {
                                        action: () => handleDelete(row.id),
                                    },
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

    const createScheScheduleButton = (
        <Button
            size="small"
            onClick={() => dispatch(openModal({ modalId: "createSchedule" }))}
        >
            Create Schedule
        </Button>
    );

    const actionButton = (
        <Button
            color="error"
            size="small"
            onClick={() =>
                dispatch(
                    openModal({
                        modalId: "confirm",
                        modalData: {
                            action: () =>
                                handleDelete(selectedRows.map((row) => row.id)),
                        },
                    })
                )
            }
        >
            Delete (Selected Rows)
        </Button>
    );

    return (
        <Box>
            <CreateSchedule />
            <ConfirmationModal title="Do you want to Delete this ?" />

            <N_DataGrid
                rows={allSchedules}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
                setQuery={setQuery}
                query={query}
                meta={meta}
                createButton={createScheScheduleButton}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                selectedActionButton={actionButton}
                searchField={false}
            >
                <Stack
                    direction={"row"}
                    spacing={2}
                    flexWrap={"wrap"}
                    rowGap={1}
                >
                    <FilterByTime query={query} setQuery={setQuery} />

                    <FilterByDate query={query} />
                </Stack>
            </N_DataGrid>
        </Box>
    );
};

export default SchedulePage;
