"use client";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useState } from "react";

import { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { tryCatch } from "@/utils/tryCatch";
import CreateDoctor from "./compopnent/CreateDoctor";
import {
    useDeleteDoctorMutation,
    useGetDoctorsQuery,
} from "@/redux/api/doctorsApi";
import { useAppDispatch } from "@/redux/hooks";
import N_DataGrid from "@/components/dataGrid/DataGrid";
import EditIcon from "@mui/icons-material/Edit";

import { openModal } from "@/redux/slices/modalSlice";
import EditDoctor from "./compopnent/EditDoctor";

import tableSerial from "@/utils/tableSerial";
import FilterPopover from "@/components/dataGrid/filters/FilterPopover";
import N_Select from "@/components/forms/N_Select";
import { defaultQuery, Gender } from "@/constants/commmon";
import N_Input from "@/components/forms/N_Input";
import ConfirmationModal from "@/components/modals/ConfirmationModal";

const DoctorsPage = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>(defaultQuery);
    // const [searchTerm, setSearchTerm] = useState("");

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
            field: "name",
            headerName: "Name",
            flex: 1,
            sortable: true,
            // filterable: false,
        },
        { field: "email", headerName: "Email", minWidth: 200 },
        { field: "contactNumber", headerName: "Contact Number", flex: 1 },
        {
            field: "gender",
            headerName: "Gender",
            type: "singleSelect",
            valueOptions: ["Male", "Female"],
            flex: 1,
        },
        {
            field: "apointmentFee",
            headerName: "Appointment Fee",
            flex: 1,
            sortable: true,
        },
        {
            field: "action",
            headerName: "Action",
            disableColumnMenu: true,
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <IconButton
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
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>

                    <IconButton
                        onClick={() =>
                            dispatch(
                                openModal({
                                    modalId: "editDoctor",
                                    modalData: { data: row },
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

    const createButton = (
        <Button
            size="small"
            onClick={() => dispatch(openModal({ modalId: "createDoctor" }))}
        >
            Create New Doctor
        </Button>
    );

    return (
        <Box>
            <N_DataGrid
                serial={true}
                createButton={createButton}
                rows={doctors}
                columns={columnDef}
                isLoading={isFetching}
                notFoundFor="Doctor"
                // searchTerm={searchTerm}
                setQuery={setQuery}
                query={query}
                meta={meta}
                rowSelection={false}
            >
                <Stack direction="row" spacing={2}>
                    <FilterPopover
                        filterLabel={"Filter By Gender"}
                        btnBackgroundTrue={query.gender}
                        minWidth="200px"
                    >
                        <N_Select items={Gender} name="gender" label="Gender" />
                    </FilterPopover>

                    <FilterPopover
                        filterLabel={"Filter by Fees Range"}
                        btnBackgroundTrue={query.maxFees || query.minFees}
                        minWidth="200px"
                    >
                        <N_Input name="minFees" label="Minimum Fess" />
                        <N_Input name="maxFees" label="Maximum Fess" />
                    </FilterPopover>
                </Stack>
            </N_DataGrid>

            {/* modals */}
            <CreateDoctor />
            <EditDoctor />
            <ConfirmationModal title="Do You Want to Delete this Doctor" />
        </Box>
    );
};

export default DoctorsPage;
