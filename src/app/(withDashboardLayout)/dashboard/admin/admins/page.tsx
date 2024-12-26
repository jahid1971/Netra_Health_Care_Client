"use client";
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";

import { GridColDef } from "@mui/x-data-grid";

import { useAppDispatch } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";

import { openModal } from "@/redux/slices/modalSlice";

import tableSerial from "@/utils/tableSerial";

import { defaultQuery } from "@/constants/commmon";

import {
    useDeleteAdminMutation,
    useGetAllAdminsQuery,
} from "@/redux/api/adminApi";
import { TQuery } from "@/types/common";
import CreateAdmin from "./components/CreateAdmin";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tryCatch } from "@/utils/tryCatch";
import ConfirmationModal from "@/components/modals/ConfirmationModal";


const AdminsPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<TQuery>(defaultQuery);

    const { data, isFetching } = useGetAllAdminsQuery(query);
    const [deleteAdmin] = useDeleteAdminMutation();

    const adminData = data?.data || [];
    const meta = data?.meta;

    const admins = adminData?.map((admin, index) => ({
        ...admin,
        sl: tableSerial(query, index),
    }));

    const handleDelete = (id: string) => {
        tryCatch(
            async () => await deleteAdmin(id),
            "Deleting admin",
            "Admin Deleted Successfully"
        );
    };

    const columnDef: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, sortable: true },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", minWidth: 150 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            disableColumnMenu: true,
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    {/* Only show delete button if not superAdmin */}
                    {row.role !== "SUPER_ADMIN" && (
                        <IconButton
                            onClick={() =>
                                dispatch(
                                    openModal({
                                        modalId: "confirmDeleteAdmin",
                                        modalData: {
                                            action: () => handleDelete(row.id),
                                        },
                                    })
                                )
                            }
                            aria-label="delete"
                        >
                            <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                    )}
                </Box>
            ),
        },
    ];

    const createButton = (
        <Button
            size="small"
            onClick={() => dispatch(openModal({ modalId: "createAdmin" }))}
        >
            Create New Admin
        </Button>
    );

    return (
        <Box>
            <N_DataGrid
                createButton={createButton}
                rows={admins}
                columns={columnDef}
                isLoading={isFetching}
                notFoundFor="Admin"
                setQuery={setQuery}
                query={query}
                meta={meta}
                rowSelection={false}
                filter={false}
            ></N_DataGrid>

            {/* modals */}
            <CreateAdmin />
            <ConfirmationModal
                title="Do You Want to Delete this Admin"
                modalId="confirmDeleteAdmin"
            />
        </Box>
    );
};

export default AdminsPage;
