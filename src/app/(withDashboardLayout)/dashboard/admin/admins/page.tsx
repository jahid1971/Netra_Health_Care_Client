"use client";
import { Box, Button } from "@mui/material";
import { useState } from "react";

import { GridColDef } from "@mui/x-data-grid";

import { useAppDispatch } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";

import { openModal } from "@/redux/slices/modalSlice";

import tableSerial from "@/utils/tableSerial";

import { defaultQuery } from "@/constants/commmon";

import { useGetAllAdminsQuery } from "@/redux/api/adminApi";
import { TQuery } from "@/types/common";
import CreateAdmin from "./components/CreateAdmin";

const AdminsPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<TQuery>(defaultQuery);

    const { data, isFetching } = useGetAllAdminsQuery(query);

    const adminData = data?.data || [];
    const meta = data?.meta;

    const admins = adminData?.map((admin, index) => ({
        ...admin,
        sl: tableSerial(query, index),
    }));

    const columnDef: GridColDef[] = [
        {
            field: "sl",
            headerName: "SL",
            width: 80,
            headerAlign: "center",
            align: "center",
            sortable: false,
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "role", headerName: "Role", minWidth: 150 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
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
                // searchTerm={searchTerm}
                setQuery={setQuery}
                query={query}
                meta={meta}
                rowSelection={false}
                filter={false}
            ></N_DataGrid>

            {/* modals */}
            <CreateAdmin />
        </Box>
    );
};

export default AdminsPage;
