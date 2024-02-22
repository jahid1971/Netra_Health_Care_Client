import { Box, Stack, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

type TDataGridProps = {
    rows: any[];
    columns: any[];
    isFetching?: boolean;
    hideFooter?: boolean;
    autoHeight?: boolean;
    notFoundTitle?: string;
};

const N_DataGrid = ({ rows, columns, isFetching, hideFooter, autoHeight, notFoundTitle }: TDataGridProps) => {
    
    const CustomNoRowsOverlay = () => {
        return (
            <Stack height={"100%"} textAlign={"center"} justifyContent={"center"}>
                <Typography>No {notFoundTitle ? notFoundTitle : "Data"} Found</Typography>
            </Stack>
        );
    };

    return (
        <Box my={2}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={isFetching}
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
                }}
            />
        </Box>
    );
};

export default N_DataGrid;
