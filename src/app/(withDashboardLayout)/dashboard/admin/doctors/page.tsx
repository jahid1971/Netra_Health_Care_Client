"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDeleteSpecialityMutation, useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { tryCatch } from "@/utils/tryCatch";
import CreateDoctor from "./compopnent/CreateDoctor";
import { useDeleteDoctorMutation, useGetDoctorsQuery } from "@/redux/api/doctorsApi";
import { useAppDispatch, useDebounced } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { openModal } from "@/redux/features/modal/modalSlice";
import EditDoctor from "./compopnent/EditDoctor";

const DoctorsPage = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const query: Record<string, any> = {};
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounced({ searchQuery: searchTerm, delay: 500 });

    if (!!debouncedSearchTerm) query.searchTerm = searchTerm;

    const { data: doctors, isLoading, isFetching } = useGetDoctorsQuery(query);
    const [deleteDoctor] = useDeleteDoctorMutation();

    const handleDelete = (id: string) => {
        tryCatch(async () => await deleteDoctor(id), "Deleting docotr", "Doctor Deleted Successfully");
    };
    const columnDef: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
        { field: "gender", headerName: "Gender", flex: 1 },
        { field: "apointmentFee", headerName: "Appointment Fee", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>

                    <IconButton
                        onClick={() => dispatch(openModal({ modalId: "editDoctor", modalData: row }))}
                        aria-label="delete">
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={() => dispatch(openModal({ modalId: "createDoctor" }))}>
                    Create New Doctor
                </Button>

                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth={false}
                    size="small"
                    placeholder="Search Speciality"
                />
            </Stack>

            <N_DataGrid
                rows={doctors?.data}
                columns={columnDef}
                isLoading={isFetching}
                notFoundFor="Doctor"
            />
            <CreateDoctor />
            <EditDoctor />
        </Box>
    );
};

export default DoctorsPage;
