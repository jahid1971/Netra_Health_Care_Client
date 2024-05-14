"use client";
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    useDeleteSpecialityMutation,
    useGetAllSpecialitiesQuery,
} from "@/redux/api/specialitiesApi";
import {
    DataGrid,
    GridColDef,
    GridFilterInputValueProps,
    GridFilterItem,
} from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { tryCatch } from "@/utils/tryCatch";
import CreateDoctor from "./compopnent/CreateDoctor";
import {
    useDeleteDoctorMutation,
    useGetDoctorsQuery,
} from "@/redux/api/doctorsApi";
import { useAppDispatch, useDebounced } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { openModal } from "@/redux/slices/modalSlice";
import EditDoctor from "./compopnent/EditDoctor";
import { set } from "react-hook-form";
import tableSerial from "@/utils/tableSerial";

const DoctorsPage = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>({});
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, isFetching } = useGetDoctorsQuery(query);

    const doctorData = data?.data || [];
    const meta = data?.meta;

    const doctors = doctorData?.map((doctor, index) => ({
        ...doctor,
        sl: tableSerial(query, index),
    }));

    const [deleteDoctor] = useDeleteDoctorMutation();

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deleteDoctor(id),
            "Deleting docotr",
            "Doctor Deleted Successfully"
        );
    };
    const columnDef: GridColDef[] = [
        {
            field: "sl",
            headerName: "SL",
            width: 80,
            headerAlign: "center",
            align: "center",
        },
        { field: "name", headerName: "Name", flex: 1, filterable: false },
        { field: "email", headerName: "Email", minWidth: 200 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
        {
            field: "gender",
            headerName: "Gender",
            type: "singleSelect",
            valueOptions: ["Male", "Female"],
            flex: 1,
        },
        { field: "apointmentFee", headerName: "Appointment Fee", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            disableColumnMenu: true,
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>

                    <IconButton
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "editDoctor",
                                    modalData: row,
                                })
                            )
                        }
                        aria-label="delete"
                    >
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button
                    size="small"
                    onClick={() =>
                        dispatch(openModal({ modalId: "createDoctor" }))
                    }
                >
                    Create New Doctor
                </Button>

                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth={false}
                    size="small"
                    placeholder="Search Doctor"
                />
            </Stack>

            <N_DataGrid
                rows={doctors}
                columns={columnDef}
                isLoading={isFetching}
                notFoundFor="Doctor"
                searchTerm={searchTerm}
                setQuery={setQuery}
                meta={meta}
            />
            {/* modals */}
            <CreateDoctor />
            <EditDoctor />
        </Box>
    );
};

export default DoctorsPage;
