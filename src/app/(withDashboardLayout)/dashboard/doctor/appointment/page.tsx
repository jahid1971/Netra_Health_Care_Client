"use client";
import {
    useGetDocotorAppointmentsQuery,
    useGetAllAppointmentsQuery,
} from "@/redux/api/appointmentApi";
import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import VideocamIcon from "@mui/icons-material/Videocam";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import { useState } from "react";
import Link from "next/link";
import { TAppointment } from "@/types/Appointment";
import tableSerial from "@/utils/tableSerial";
import { TQuery } from "@/types/common";

const DoctorAppointment = () => {
    const [query, setQuery] = useState<TQuery>({});
    const { data, isFetching } = useGetAllAppointmentsQuery(query);

    const appointments = data?.data || [];

    const appointmentsData = appointments?.map((appointment, index) => ({
        ...appointment,
        sl: tableSerial(query, index),
    }));

    console.log(appointmentsData, "appointmentsData");
    const meta = data?.meta;

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Patient Name",
            flex: 1,
            width: 200,
            renderCell: ({ row }) => row.patient.name,
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
            // renderCell: ({ row }) => timeFormatter(row.schedule.startDateTime),
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
                // sorting={false}
                setQuery={setQuery}
                query={query}
                rows={appointmentsData || []}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Appointment"
                meta={meta}
                rowSelection={false}
            />
        </Box>
    );
};

export default DoctorAppointment;
