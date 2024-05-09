"use client";
import { Box, IconButton } from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import N_DataGrid from "@/components/dataGrid/DataGrid";

import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { useState } from "react";
import N_Pagination from "@/components/pagination/Pagination";
import { useGetMyAppointmentQuery } from "@/redux/api/appointmentApi";
import N_Chips from "@/components/ui/N_Chips";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";

const PatientAppoinmtntPage = () => {
    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isFetching } = useGetMyAppointmentQuery(query);

    const appointmentsData = data?.data;

    console.log(appointmentsData, "appointmentdataaa");

    const meta = data?.meta;

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Doctor Name",
            flex: 1,
            headerAlign: "center",
            align: "center",
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
            headerName: "Appointment Date",
            flex: 1,
            renderCell: ({ row }) => timeFormatter(row.schedule.startDateTime),
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            flex: 1,
            maxWidth: 150,
            renderCell: ({ row }) => {
                return row.paymentStatus === "PAID" ? (
                    <N_Chips label={row.paymentStatus} type="success" />
                ) : (
                    <N_Chips label={row.paymentStatus} type="error" />
                );
            },
        },
        {
            field: "action",
            headerName: "Join",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <IconButton
                        component={Link}
                        href={`/video?videoCallingId=${row?.videoCallingId}`}
                        disabled={row.paymentStatus === "UNPAID"}
                    >
                        <VideocamIcon
                            sx={{
                                color:
                                    row.paymentStatus === "PAID"
                                        ? "primary.main"
                                        : "",
                            }}
                        />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            <N_DataGrid
                sorting={false}
                setQuery={setQuery}
                rows={appointmentsData || []}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Schedule"
            />
            <N_Pagination setQuery={setQuery} meta={meta} />
        </Box>
    );
};

export default PatientAppoinmtntPage;
