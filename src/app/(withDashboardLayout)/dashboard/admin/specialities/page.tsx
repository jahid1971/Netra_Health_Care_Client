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
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { defaultQuery } from "@/constants/commmon";

const SpecialitiesPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>(defaultQuery);

    const { data, isLoading, isFetching } = useGetAllSpecialitiesQuery(query);

    const allSpecailities = data?.data || [];
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
            width: 200,
        },
        {
            field: "icon",
            headerName: "Icon",
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }) => {
                return (
                    <Box
                        display="flex"
                        alignItems="center"
                        height="100%"
                        justifyContent="center"
                    >
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
                                    modalData: {
                                        action: () => handleDelete(row.id),
                                    },
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

    const createButton = (
        <Button
            onClick={() => dispatch(openModal({ modalId: "createSpeciality" }))}
            size="small"
        >
            Create Speciality
        </Button>
    );

    return (
        <Box>
            {/* modals */}
            <CreateSpecialities />
            <ConfirmationModal title="Do you want to Delete this ?" />

            <N_DataGrid
                rows={allSpecailities}
                columns={columnDef}
                isLoading={isLoading || isFetching}
                notFoundFor="Specialty"
                setQuery={setQuery}
                meta={meta}
                createButton={createButton}
                filter={false}
                rowSelection={false}
            ></N_DataGrid>
        </Box>
    );
};

export default SpecialitiesPage;
