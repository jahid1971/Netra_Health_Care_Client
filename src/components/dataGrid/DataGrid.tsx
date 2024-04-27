import { Box, Stack, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

type TDataGridProps = {
    rows: any[];
    columns: any[];
    isLoading?: boolean;
    hideFooter?: boolean;
    autoHeight?: boolean;
    notFoundFor?: string;
    slots?: any;
};

const N_DataGrid = ({ rows, columns, isLoading, hideFooter, autoHeight, notFoundFor,slots }: TDataGridProps) => {
    
    const CustomNoRowsOverlay = () => {
        return (
            <Stack height={"100%"} textAlign={"center"} justifyContent={"center"}>
                <Typography>No {notFoundFor ? notFoundFor : "Data"} Found</Typography>
            </Stack>
        );
    };

    return (
        <Box my={2}>
            <DataGrid
                rows={rows}
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
                    noRowsOverlay: CustomNoRowsOverlay, ...slots
                }}
            />
        </Box>
    );
};

export default N_DataGrid;
