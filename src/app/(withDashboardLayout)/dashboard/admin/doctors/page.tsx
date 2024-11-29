"use client";
import { Box, Button, Chip, IconButton, Stack, Tooltip } from "@mui/material";
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
import Image from "next/image";
import defaultDoctorPhoto from "@/assets/svgs/profile.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import N_MultiSelect from "@/components/forms/N_MultiSelect";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";

const DoctorsPage = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState<Record<string, any>>(defaultQuery);

    const { data: specialties, isLoading: isLoadingSpecialties } =
        useGetAllSpecialitiesQuery(undefined);

    const allSpecialitiesData = specialties?.data?.map((item: any) => ({
        label: item.title,
        value: item.id,
    }));

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
            field: "profilePhoto",
            headerName: "Photo",
            flex: 1,
            renderCell: ({ value }) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Image
                        src={value || defaultDoctorPhoto}
                        alt="Doctor"
                        width={50}
                        height={50}
                        objectFit="cover"
                        

                        style={{ borderRadius: "50%" }}
                    />
                </Box>
            ),
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 1,
            sortable: true,
        },
        { field: "email", headerName: "Email", minWidth: 150 },

        {
            field: "specialties",
            headerName: "Specialties",
            // minWidth: 150,
            renderCell: ({ value }) => (
                <Box
                    display={"flex"}
                    flexWrap="wrap"
                    sx={{ alignItems: "center", height: "100%", py: 1 }}
                >
                    {value?.length > 0 ? (
                        value?.map((spec: any, index: number) => (
                            <Chip
                                color="primary"
                                key={index}
                                label={spec.title}
                                size="small"
                                sx={{ marginRight: 0.5, marginBottom: 0.5 }}
                            />
                        ))
                    ) : (
                        <span>No Specialties</span>
                    )}
                </Box>
            ),
        },
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
            headerName: "Fee",
            flex: 1,
            sortable: true,
        },
        {
            field: "action",
            headerName: "Action",
            disableColumnMenu: true,
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }) => (
                <Box>
                    <Tooltip title="View Doctor Details">
                        <IconButton href={`/dashboard/admin/doctors/${row.id}`}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Doctor">
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
                    </Tooltip>

                    <Tooltip title="Edit Doctor">
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
                    </Tooltip>
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
                // rowHeight={80}
                autoRowHeight={true}
            >
                <Stack direction="row" spacing={2}>
                    <FilterPopover
                        filterLabel={"Filter By Specialties"}
                        btnBackgroundTrue={query.specialties}
                        minWidth="200px"
                    >
                        <N_MultiSelect
                            items={allSpecialitiesData || []}
                            name="specialties"
                            label="Specialties"
                            disabled={
                                isLoadingSpecialties ||
                                !allSpecialitiesData?.length
                            }
                        />
                    </FilterPopover>
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
