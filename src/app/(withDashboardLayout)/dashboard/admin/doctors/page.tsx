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
import { useDebounced } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";

const DoctorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                    <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
            ),
        },
    ];

    return (
        <Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
                <CreateDoctor open={isModalOpen} setOpen={setIsModalOpen} />

                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth={false}
                    size="small"
                    placeholder="Search Speciality"
                />
            </Stack>

            {/* <Box my={2}>
                    <DataGrid
                        rows={doctors?.data}
                        columns={columnDef}
                        loading={isFetching ? true : false}
                        slotProps={{
                            loadingOverlay: {
                              variant: 'linear-progress',
                              noRowsVariant: 'skeleton',
                            },
                          }}
                    />
                </Box> */}
            <N_DataGrid
                rows={doctors?.data}
                columns={columnDef}
                isFetching={isFetching}
                notFoundTitle="Doctor"
            />
        </Box>
    );
};

export default DoctorsPage;
