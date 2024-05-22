"use client";
import { useDebounced } from "@/redux/hooks";
import { Box, Stack, styled, Typography } from "@mui/material";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import N_Pagination from "../pagination/Pagination";
import { theme } from "@/lib/theme/theme";
import { blue } from "@mui/material/colors";

type TDataGridProps = {
    rows: any[];
    columns: any[];
    isLoading?: boolean;
    hideFooter?: boolean;
    autoHeight?: boolean;
    notFoundFor?: string;
    slots?: any;
    searchTerm?: any;
    sorting?: boolean;
    setQuery?: (queryUpdater: (prevQuery: any) => any) => void;
    meta?: any;
};

const N_DataGrid = ({
    rows,
    columns,
    isLoading,
    hideFooter,
    autoHeight,
    notFoundFor,
    slots,
    searchTerm,
    sorting = true,
    setQuery,
    meta,

    headerClassName = "default-header",
    headerStyle = {},
}: TDataGridProps) => {
    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 500,
    });

    useEffect(() => {
        if (debouncedSearchTerm) {
            setQuery((prevQuery) => ({
                ...prevQuery,
                searchTerm: debouncedSearchTerm,
            }));
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        if (rows?.length < 1 && meta?.page > 1) {
            setQuery((prevQuery) => ({
                ...prevQuery,
                page: meta?.page - 1,
            }));
        }
    }, [rows?.length]);

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
        setQuery((prev: any) => ({
            ...prev,
            page: 0,
            sortBy: sortModel[0]?.field,
            sortOrder: sortModel[0]?.sort,
        }));
    }, []);

    return (
        <Box my={2}>
            <Box sx={{ backgroundColor: "white", mb: 2,border:"none" }}>
                <DataGrid
                    rows={rows}
                    disableColumnSorting={sorting ? false : true}
                    sortingMode="server"
                    onSortModelChange={handleSortModelChange}
                    disableColumnFilter
                    columns={styledColumns}
                    loading={isLoading}
                    hideFooter={hideFooter}
                    autoHeight={autoHeight}
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

                        border: "none",
                        // '& .MuiDataGrid-cell': {
                        //     border: "none",
                        // },
                        // '& .MuiDataGrid-columnHeaders': {
                        //     border: "none",
                        // },
                        // '& .MuiDataGrid-columnSeparator': {
                        //     display: "none",
                        // },
                        // '& .MuiDataGrid-footerContainer': {
                        //     border: "none",
                        // },
                        // '& .MuiDataGrid-virtualScroller': {
                        //     // Remove horizontal lines
                        //     '&::-webkit-scrollbar': {
                        //         display: "none",
                        //     },
                        // },
                        '& .MuiDataGrid-cell:focus': {
                            outline: "none",
                        },
                    }}
                />
            </Box>

            {meta && meta?.total > 5 && (
                <N_Pagination setQuery={setQuery} meta={meta} />
            )}
        </Box>
    );
};

export default N_DataGrid;
