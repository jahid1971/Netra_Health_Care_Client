"use client";

import { Box, Button, Slide, Stack, Typography } from "@mui/material";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import N_Pagination from "../pagination/Pagination";

import { blue } from "@mui/material/colors";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import N_Input from "../forms/N_Input";
import N_Form from "../forms/N_Form";
import CloseIcon from "@mui/icons-material/Close";
import { defaultQuery } from "@/constants/commmon";
import tableSerial from "@/utils/tableSerial";

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
    checkedRowsActionBtn?: any;
    searchField?: boolean;
    query?: any;
    serial?: boolean;
    rowHeight?: number;
    autoRowHeight?: boolean;
};

const N_DataGrid = ({
    rows,
    columns,
    isLoading,
    hideFooter,
    autoHeight = true,
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
    checkedRowsActionBtn,
    searchField = true,
    serial = true,
    rowHeight,
    autoRowHeight,
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

    const { rowData, columnDefs } = useMemo(() => {
        if (serial && query && rows) {
            const updatedRows = rows?.map((row, index) => ({
                ...row,
                sl: tableSerial(query, index),
                key: index,
            }));
            const updatedColumns = [
                {
                    field: "sl",
                    headerName: "SL",
                    width: 80,
                    headerAlign: "center",
                    align: "center",
                    sortable: false,
                },
                ...columns,
            ];
            return { rowData: updatedRows, columnDefs: updatedColumns };
        }
        return { rowData: rows, columnDefs: columns };
    }, [serial, columns, rows, query]);

    const styledColumns = columnDefs?.map((col) => ({
        sortable: false,
        headerClassName: headerClassName,
        ...col,
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

    const handleSortModelChange = useCallback(
        (sortModel: GridSortModel) => {
            setQuery &&
                setQuery((prev: any) => ({
                    ...prev,
                    page: 1,
                    sortBy: sortModel[0]?.field,
                    sortOrder: sortModel[0]?.sort,
                }));
        },
        [setQuery]
    );

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
                                </Box>
                            </Slide>
                        )}
                        {query &&
                            Object.keys(query).some(
                                (key) =>
                                    !["page", "limit"].includes(key) &&
                                    query[key]
                            ) && (
                                <Button
                                    // variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                        setQuery &&
                                            setQuery({
                                                ...defaultQuery,
                                            });
                                    }}
                                    endIcon={<CloseIcon />}
                                >
                                    reset
                                </Button>
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

                {checkedRowsActionBtn && (
                    <Slide
                        direction="right"
                        in={selectedRows?.length > 0}
                        mountOnEnter
                        unmountOnExit
                        timeout={300}
                    >
                        <Box mb={1}> {checkedRowsActionBtn}</Box>
                    </Slide>
                )}

                <Box sx={{ backgroundColor: "white", mb: 2 }}>
                    <DataGrid
                        rows={rowData}
                        checkboxSelection={rowSelection}
                        disableColumnSorting={sorting ? false : true}
                        sortingMode="server"
                        onSortModelChange={handleSortModelChange}
                        disableColumnFilter
                        columns={styledColumns}
                        loading={isLoading}
                        hideFooter={hideFooter}
                        autoHeight={autoHeight}
                        getRowHeight={autoRowHeight ? () => "auto" : undefined}
                        // getEstimatedRowHeight={() => rowHeight || 52}
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
                        sortModel={
                            query?.sortBy
                                ? [
                                      {
                                          field: query.sortBy,
                                          sort: query.sortOrder,
                                      },
                                  ]
                                : []
                        }
                        sx={{
                            "& .default-header": {
                                border: "none",
                                backgroundColor: blue[50],
                                backdropFilter: "blur(10px)",
                            },
                            "& .MuiDataGrid-columnHeaderCheckbox": {
                                backgroundColor: blue[50],
                            },
                            "& .MuiDataGrid-cell": {
                                display: "flex",
                                alignItems: "center",
                            },
                            "& .MuiDataGrid-row:nth-of-type(odd)": {
                                backgroundColor: "#F4F7FE",
                            },
                            "& .MuiDataGrid-row:nth-of-type(even)": {
                                backgroundColor: "white",
                            },
                            border: "none",
                            "& .MuiDataGrid-cell:focus": {
                                outline: "none",
                            },

                            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell":
                                autoRowHeight ? { py: "8px" } : undefined,
                            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell":
                                autoRowHeight ? { py: "15px" } : undefined,
                            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell":
                                autoRowHeight ? { py: "22px" } : undefined,

                            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                                {
                                    outline: "none",
                                },
                            "& .MuiDataGrid-iconButtonContainer": {
                                visibility: "visible",
                                width: "auto !important",
                            },
                            "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon":
                                {
                                    color: query?.sortBy
                                        ? "primary.main"
                                        : "rgba(0, 0, 0, 0.54)",
                                    opacity: "1 !important",
                                },
                            "& .MuiDataGrid-sortIcon": {
                                opacity: "1 !important",
                                color: "rgba(0, 0, 0, 0.54)", // default for inactive
                            },
                            "& .MuiDataGrid-menuIconButton": {
                                visibility: "visible",
                                width: "auto !important",
                                opacity: "1 !important",
                            },
                        }}
                        rowHeight={rowHeight}
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
