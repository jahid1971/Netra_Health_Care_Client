"use client";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

import { GridColDef } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import { tryCatch } from "@/utils/tryCatch";

import { useAppDispatch } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";

import { openModal } from "@/redux/slices/modalSlice";

import tableSerial from "@/utils/tableSerial";
import FilterPopover from "@/components/dataGrid/filters/FilterPopover";
import N_Select from "@/components/forms/N_Select";
import { defaultQuery, userStatus } from "@/constants/commmon";

import {
    useDeletePationMutation,
    useGetAllPatientsQuery,
    useUpdatePatientMutation,
} from "@/redux/api/patientApi";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import N_Chips from "@/components/ui/N_Chips";
import { modifyPayload } from "@/utils/modifyPayload";

const PatientPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>(defaultQuery);

    const { data, isFetching } = useGetAllPatientsQuery(query);

    const [updatePatient] = useUpdatePatientMutation();

    const [deletePatient] = useDeletePationMutation();
    const patientData = data?.data || [];

    const meta = data?.meta;

    const patients = patientData?.map((patient, index) => ({
        ...patient,
        sl: tableSerial(query, index),
    }));

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deletePatient(id),
            "Deleting patient",
            "Patient Deleted Successfully"
        );
    };

    const updatePntStatus = (id: string, status: string) => {
        tryCatch(
            async () =>
                await updatePatient({
                    id: id,
                    data: {
                        status: status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
                    },
                }),
            undefined,
            "Patient Status Updated Successfully"
        );
    };

    const columnDef: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, sortable: true },
        { field: "email", headerName: "Email", minWidth: 200 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },

        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ row }) => {
                return row?.status === "ACTIVE" ? (
                    <N_Chips label={row?.status} type="success" />
                ) : (
                    <N_Chips label={row?.status} type="error" />
                );
            },
            sortable: false,
        },
        {
            field: "action",
            headerName: "Action",
            disableColumnMenu: true,
            flex: 1,
            sortable: false,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "confirm",
                                    modalData: {
                                        action: () =>
                                            updatePntStatus(row.id, row.status),
                                        title: `Do you want to ${
                                            row?.status === "ACTIVE"
                                                ? "Block"
                                                : "Unblock"
                                        } this Patient ?`,
                                    },
                                })
                            )
                        }
                    >
                        {row?.status === "ACTIVE" ? (
                            <BlockIcon sx={{ color: "red" }} />
                        ) : (
                            <CheckIcon sx={{ color: "green" }} />
                        )}
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "confirm",
                                    modalData: {
                                        action: () => handleDelete(row.id),
                                        title: `Do you want to delete this Patient ?`,
                                    },
                                })
                            )
                        }
                    >
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <N_DataGrid
                rows={patients}
                columns={columnDef}
                isLoading={isFetching}
                notFoundFor="Doctor"
                setQuery={setQuery}
                query={query}
                meta={meta}
                rowSelection={false}
            >
                <FilterPopover
                    filterLabel={"Filter by active status"}
                    btnBackgroundTrue={query.maxFees || query.minFees}
                    minWidth="200px"
                >
                    <N_Select label="Status" items={userStatus} name="status" />
                </FilterPopover>
            </N_DataGrid>

            {/* modals */}
            <ConfirmationModal />
        </Box>
    );
};

export default PatientPage;
