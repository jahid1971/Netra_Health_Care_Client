"use client";
import {
    useGetAllAppointmentsQuery,
    useUpdateAppointStatusMutation,
} from "@/redux/api/appointmentApi";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { Box, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import N_DataGrid from "@/components/dataGrid/DataGrid";
import { useEffect, useState } from "react";

import tableSerial from "@/utils/tableSerial";
import { TQuery } from "@/types/common";
import { appointmentStatus, defaultQuery } from "@/constants/commmon";
import N_Select from "@/components/forms/N_Select";

import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import MuiSelect from "@/components/forms/Select";
import FilterPopover from "@/components/dataGrid/filters/FilterPopover";

import FilterByDate from "@/components/dataGrid/filters/FilterByDate";

const DoctorAppointment = () => {
    const dispatch = useAppDispatch();
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [query, setQuery] = useState<TQuery>(defaultQuery);
    const { data, isFetching } = useGetAllAppointmentsQuery(query);

    const [updateStatus, { isSuccess, isLoading }] =
        useUpdateAppointStatusMutation();

    useEffect(() => {
        if (isSuccess) {
            setQuery(defaultQuery);
            setSelectedValue(null);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (selectedValue) {
            dispatch(
                openModal({
                    modalId: "confirm",
                    modalData: {
                        action: () =>
                            updateStatus({
                                id: selectedRowId ?? undefined,
                                data: { status: selectedValue },
                            }),
                    },
                })
            );
        }
    }, [selectedValue, dispatch, selectedRowId, updateStatus]);

    const appointments = data?.data || [];

    const appointmentsData = appointments?.map((appointment, index) => ({
        ...appointment,
        sl: tableSerial(query, index),
    }));

    const meta = data?.meta;

    const columns: GridColDef[] = [
        {
            field: "sl",
            headerName: "SL",
            width: 120,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "patientName",
            headerName: "Patient Name",
            flex: 1,
            width: 200,
            renderCell: ({ row }) => row.patient.name,
        },
        {
            field: "doctorName",
            headerName: "Doctor Name",
            flex: 1,
            width: 200,
            renderCell: ({ row }) => row.doctor.name,
        },
        {
            field: "appointmentDate",
            headerName: "Appointment Date",
            flex: 1,
            renderCell: ({ row }) => dateFaormatter(row.schedule.startDateTime),
        },
        {
            field: "appointmentTime",
            headerName: "Appointment Time",
            flex: 1,
            renderCell: ({ row }) => timeFormatter(row.schedule.startDateTime),
        },
        {
            field: "status",
            headerName: "Appointment Status",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Change Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <MuiSelect
                        items={appointmentStatus}
                        label="status"
                        setSelectedValue={(value: string) => {
                            setSelectedValue(value);
                            setSelectedRowId(row.id);
                        }}
                        selectedValue={selectedValue}
                        disableUnderline={true}
                    />
                );
            },
        },
    ];
    return (
        <Box>
            <N_DataGrid
                // sorting={false}
                setQuery={setQuery}
                query={query}
                rows={appointmentsData || []}
                columns={columns}
                isLoading={isFetching || isLoading}
                notFoundFor="Appointment"
                meta={meta}
                rowSelection={false}
            >
                <Stack direction={"row"} spacing={2}>
                    {/* <FilterByTime query={query} setQuery={setQuery} /> */}
                    <FilterPopover
                        filterLabel="filter by appointment status"
                        btnBackgroundTrue={query.status}
                        minWidth="220px"
                    >
                        <N_Select
                            label="Appointment Status"
                            items={appointmentStatus}
                            name="status"
                        />
                    </FilterPopover>

                    <FilterByDate query={query} setQuery={setQuery} />
                </Stack>
            </N_DataGrid>

            <ConfirmationModal title="Do you want to change the Appointment status?" />
        </Box>
    );
};

export default DoctorAppointment;
