"use client";
import { useDebounced } from "@/redux/hooks";
import { Box, Stack, styled, Typography } from "@mui/material";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";

type TDataGridProps = {
    rows: any[];
    columns: any[];
    isLoading?: boolean;
    hideFooter?: boolean;
    autoHeight?: boolean;
    notFoundFor?: string;
    slots?: any;
    searchTerm?: any;
    setQuery: (queryUpdater: (prevQuery: any) => any) => void;
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
    setQuery,
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

    const CustomNoRowsOverlay = () => {
        return (
            <Stack
                height={"100%"}
                textAlign={"center"}
                justifyContent={"center"}>
                <Typography>
                    No {notFoundFor ? notFoundFor : "Data"} Found
                </Typography>
            </Stack>
        );
    };

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
        setQuery((prev: any) => ({
            ...prev,
            sortBy: sortModel[0]?.field,
            sortOrder: sortModel[0]?.sort,
        }));
    }, []);

    return (
        <Box my={2}>
            <DataGrid
                rows={rows}
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
                disableColumnFilter
                columns={columns}
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
            />
        </Box>
    );
};

export default N_DataGrid;
