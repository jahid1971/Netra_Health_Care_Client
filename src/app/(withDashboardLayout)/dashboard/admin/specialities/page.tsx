"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import CreateSpecialities from "./components/CreateSpecialities";
import {
    useDeleteSpecialityMutation,
    useGetAllSpecialitiesQuery,
} from "@/redux/api/specialitiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { tryCatch } from "@/utils/tryCatch";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import N_Pagination from "@/components/pagination/Pagination";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

const SpecialitiesPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>({});

    const { data, isLoading } = useGetAllSpecialitiesQuery(query);

    const allSpecailities = data?.data;
    const meta = data?.meta;

    const [deleteSpeciality] = useDeleteSpecialityMutation();

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deleteSpeciality(id),
            "Deleting Speciality",
            "Speciality Deleted Successfully"
        );
    };

    const columnDef: GridColDef[] = [
        {
            field: "title",
            headerName: "Title",
            align: "center",
            headerAlign: "center",
            width: 150,
        },
        {
            field: "icon",
            headerName: "Icon",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }) => {
                return (
                    <Box display="flex" alignItems="center" height="100%">
                        {row.icon && (
                            <Image
                                src={row.icon}
                                width={30}
                                height={30}
                                alt="icon"
                            />
                        )}
                    </Box>
                );
            },
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
                        // onClick={() => handleDelete(row.id)}
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "confirm",
                                    modalData: () => handleDelete(row.id),
                                })
                            )
                        }
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <Box>
            {/* modals */}
            <CreateSpecialities />
            <ConfirmationModal title="Do you want to Delete this ?" />

            <Stack direction={"row"} justifyContent={"space-between"}>
                {/* <Button onClick={() => setIsModalOpen(true)}>Create Speciality</Button> */}
                <Button
                    onClick={() =>
                        dispatch(openModal({ modalId: "createSpeciality" }))
                    }
                >
                    Create Speciality
                </Button>

                <TextField
                    fullWidth={false}
                    size="small"
                    placeholder="Search Speciality"
                />
            </Stack>

            {/* {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={allSpecailities} columns={columnDef} hideFooter={true} />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )} */}

            <N_DataGrid
                rows={allSpecailities}
                columns={columnDef}
                isLoading={isLoading}
                notFoundFor="Specialty"
                setQuery={setQuery}
                meta={meta}
            />
        </Box>
    );
};

export default SpecialitiesPage;
