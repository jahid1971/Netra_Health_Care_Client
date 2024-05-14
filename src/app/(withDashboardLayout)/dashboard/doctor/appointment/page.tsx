"use client";
import {
    useGetDocotorAppointmentsQuery,
    useGetMyAppointmentQuery,
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
    const { data, isFetching } = useGetMyAppointmentQuery(query);

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
            headerName: "Appointment Date",
            flex: 1,
            renderCell: ({ row }) => timeFormatter(row.schedule.startDateTime),
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
                rows={appointmentsData || []}
                columns={columns}
                isLoading={isFetching}
                notFoundFor="Appointment"
                meta={meta}
            />
        </Box>
    );
};

export default DoctorAppointment;
