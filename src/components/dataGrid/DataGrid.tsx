"use client";

import { Box, Button, Slide, Stack, Typography } from "@mui/material";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import N_Pagination from "../pagination/Pagination";

import { blue } from "@mui/material/colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import N_Input from "../forms/N_Input";
import N_Form from "../forms/N_Form";
import CloseIcon from "@mui/icons-material/Close";
import { defaultQuery } from "@/constants/commmon";

type TDataGridProps = {
    rows: any[];
    columns: any[];
    isLoading?: boolean;
    hideFooter?: boolean;
    autoHeight?: boolean;
    notFoundFor?: string;
    slots?: any;
    // searchTerm?: any;
    sorting?: boolean;
    setQuery?: (prevQuery: any) => void;
    meta?: any;
    children?: any;
    createButton?: any;
    filter?: boolean;
    rowSelection?: boolean;
    headerClassName?: string;
    headerStyle?: any;
    setSelectedRows?: any;
    selectedRows?: any;
    selectedActionButton?: any;
    searchField?: boolean;
    query?: any;
};

const N_DataGrid = ({
    rows,
    columns,
    isLoading,
    hideFooter,
    autoHeight,
    notFoundFor,
    slots,
    // searchTerm,
    sorting = true,
    setQuery,
    query,
    meta,
    createButton,
    children,
    filter = true,
    headerClassName = "default-header",
    rowSelection = true,
    setSelectedRows,
    selectedRows,
    selectedActionButton,
    searchField = true,
}: TDataGridProps) => {
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (rows?.length < 1 && meta?.page > 1) {
            setQuery &&
                setQuery((prevQuery: any) => ({
                    ...prevQuery,
                    page: meta?.page - 1,
                }));
        }
    }, [rows?.length, meta?.page, setQuery]);

    const styledColumns = columns.map((col) => ({
        ...col,
        headerClassName: headerClassName,
    }));

    const CustomNoRowsOverlay = () => {
        return (
            <Stack
                height={"100%"}
                textAlign={"center"}
                justifyContent={"center"}
            >
                <Typography>
                    No {notFoundFor ? notFoundFor : "Data"} Found
                </Typography>
            </Stack>
        );
    };

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
        setQuery &&
            setQuery((prev: any) => ({
                ...prev,
                page: 0,
                sortBy: sortModel[0]?.field,
                sortOrder: sortModel[0]?.sort,
            }));
    }, [setQuery]);

    const handleRowSelection = (selectionModel: any) => {
        const selectedData = rows.filter((row) =>
            selectionModel.includes(row.id)
        );
        setSelectedRows && setSelectedRows(selectedData);
    };

    const handleFieldChange = (field: string, value: any) => {
        setQuery &&
            setQuery((prevQuery: any) => ({
                ...prevQuery,
                [field]: value,
            }));
    };

    return (
        <Box my={2}>
            <Box>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                    mb={1}
                >
                    <Stack
                        direction={"row"}
                        spacing={2}
                        flexWrap={"wrap"}
                        rowGap={1}
                    >
                        {createButton}

                        {filter && (
                            <Button
                                size="small"
                                variant={showFilters ? "contained" : "outlined"}
                                endIcon={<FilterAltIcon />}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                filter
                            </Button>
                        )}
                        {/*  all filter fields as children */}
                        {children && (
                            <Slide
                                direction="right"
                                in={showFilters}
                                mountOnEnter
                                unmountOnExit
                                timeout={300}
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    flexWrap={"wrap"}
                                >
                                    <N_Form
                                        handleFieldChange={handleFieldChange}
                                        query={query}
                                    >
                                        {children}
                                    </N_Form>

                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => {
                                            setQuery &&
                                                setQuery({ ...defaultQuery });
                                        }}
                                        endIcon={<CloseIcon />}
                                    >
                                        reset
                                    </Button>
                                </Box>
                            </Slide>
                        )}
                    </Stack>

                    {searchField && (
                        <N_Form
                            handleFieldChange={handleFieldChange}
                            query={query}
                        >
                            <N_Input
                                onFieldChange={true}
                                name="searchTerm"
                                label="Search..."
                                sx={{
                                    "& .MuiInputBase-root": {
                                        backgroundColor: "white",
                                        height: "36px",
                                        fontSize: "14px",
                                    },

                                    "& .MuiInputLabel-root": {
                                        top: "-2px",
                                        fontSize: "14px",
                                    },
                                }}
                            />
                        </N_Form>
                    )}
                </Stack>

                {selectedActionButton && (
                    <Slide
                        direction="right"
                        in={selectedRows?.length > 0}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                    >
                        <Box mb={1}> {selectedActionButton}</Box>
                    </Slide>
                )}

                <Box sx={{ backgroundColor: "white", mb: 2 }}>
                    <DataGrid
                        rows={rows}
                        checkboxSelection={rowSelection}
                        disableColumnSorting={sorting ? false : true}
                        sortingMode="server"
                        onSortModelChange={handleSortModelChange}
                        disableColumnFilter
                        columns={styledColumns}
                        loading={isLoading}
                        hideFooter={hideFooter}
                        autoHeight={autoHeight}
                        onRowSelectionModelChange={handleRowSelection}
                        disableRowSelectionOnClick={true}
                        slotProps={{
                            loadingOverlay: {
                                variant: "linear-progress",
                                noRowsVariant: "skeleton",
                            },
                        }}
                        slots={{
                            noRowsOverlay: CustomNoRowsOverlay,
                            ...slots,
                        }}
                        sx={{
                            "& .default-header": {
                                border: "none",
                                backgroundColor: blue[50],
                                backdropFilter: "blur(10px)",
                            },
                            "& .MuiDataGrid-columnHeaderCheckbox": {
                                backgroundColor: blue[50],
                            },

                            border: "none",
                            "& .MuiDataGrid-cell:focus": {
                                outline: "none",
                            },
                        }}
                    />
                </Box>
            </Box>

            {meta && meta?.total > 5 && setQuery && (
                <N_Pagination setQuery={setQuery} meta={meta} />
            )}
        </Box>
    );
};

export default N_DataGrid;
