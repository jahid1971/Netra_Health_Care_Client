"use client";
import { Box, Button, IconButton, Pagination, Stack } from "@mui/material";

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

import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { useMemo, useState } from "react";

import { tryCatch } from "@/utils/tryCatch";
import {  TDoctorSchedule } from "@/types/schedules";

import ConfirmationModal from "@/components/modals/ConfirmationModal";
import FilterByDate from "@/components/dataGrid/filters/FilterByDate";
import FilterByTime from "@/components/dataGrid/filters/FilterByTime";
import { defaultQuery } from "@/constants/commmon";

const DoctorSchedulePage = () => {
    const dispatch = useAppDispatch();

    const [query, setQuery] = useState<Record<string, any>>(defaultQuery);

    const { data, isLoading, isFetching } = useGetMySchedulesQuery(query);

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
                // console.log(
                //     index,
                //     query.page,
                //     query.limit,
                //     (query.page - 1) * query.limit + index + 1,
                //     "item -----------------------------------------------------------"
                // );
                return {
                    sl: (query.page - 1) * query.limit + index + 1 + ".",
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
                                    modalData: {
                                        action: () =>
                                            handleDelete(row.id as string),
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

    const createButton = (
        <Button
            onClick={() => dispatch(openModal({ modalId: "createDrSchedule" }))}
            endIcon={<AddIcon />}
            size="small"
        >
            Create Doctor Schedule
        </Button>
    );

    return (
        <Box>
            <N_DataGrid
                setQuery={setQuery}
                rows={doctorSchedules}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
                meta={meta}
                searchField={false}
                createButton={createButton}
                rowSelection={false}
                query={query}
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

            {!isLoading && <CreateDrSchedule />}
            <ConfirmationModal title="Do you want to delete this?" />
        </Box>
    );
};

export default DoctorSchedulePage;
