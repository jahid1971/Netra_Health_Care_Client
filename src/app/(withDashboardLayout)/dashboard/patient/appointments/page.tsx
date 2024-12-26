"use client";
import { Box, IconButton } from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import N_DataGrid from "@/components/dataGrid/DataGrid";

import { dateFaormatter, timeFormatter } from "@/utils/dateFormatter";
import { useState } from "react";
import N_Pagination from "@/components/pagination/Pagination";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import N_Chips from "@/components/ui/N_Chips";
import VideocamIcon from "@mui/icons-material/Videocam";
import Link from "next/link";
import tableSerial from "@/utils/tableSerial";
import { IMeta } from "@/types/common";

const PatientAppoinmtntPage = () => {
    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isFetching } = useGetAllAppointmentsQuery(query);

    const appointments = data?.data;
    const appointmentsData = appointments?.map((appointment, index) => ({
        ...appointment,
        sl: tableSerial(query, index),
    }));

    console.log(appointmentsData, "appointmentdataaa");

    const meta = data?.meta as IMeta;

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Doctor Name",
            flex: 1,

            renderCell: ({ row }) => row?.doctor?.name,
        },
        {
            field: "appointmentDate",
            headerName: "Appointment Date",
            flex: 1,
            renderCell: ({ row }) =>
                dateFaormatter(row?.schedule?.startDateTime),
        },
        {
            field: "appointmentTime",
            headerName: "Appointment Time",
            flex: 1,
            width: 200,
            renderCell: ({ row }) => timeFormatter(row?.schedule?.startDateTime),
        },
        {
            field: "status",
            headerName: " Status",
            flex: 1,
            maxWidth: 150,
            // renderCell: ({ row }) => {
            //     return row?.paymentStatus === "PAID" ? (
            //         <N_Chips label={row?.paymentStatus} type="success" />
            //     ) : (
            //         <N_Chips label={row?.paymentStatus} type="error" />
            //     );
            // },
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
                        disabled={row?.paymentStatus === "UNPAID"}
                    >
                        <VideocamIcon
                            sx={{
                                color:
                                    row?.paymentStatus === "PAID"
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
                notFoundFor="appointment"
                meta={meta}
                rowSelection={false}
                searchField={false}
                filter={false}
            />
        </Box>
    );
};

export default PatientAppoinmtntPage;
