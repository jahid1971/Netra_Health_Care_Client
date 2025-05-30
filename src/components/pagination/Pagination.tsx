import { defaultQuery } from "@/constants/commmon";
import { IMeta } from "@/types/common";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";

interface PaginationProps {
    setQuery: (queryUpdater: (prevQuery: any) => any) => void;
    meta: IMeta | undefined;
}

const N_Pagination = ({ setQuery, meta }: PaginationProps) => {
    const [page, setPage] = useState(defaultQuery.page);
    const [limit, setLimit] = useState(defaultQuery.limit);

    let pageCount: number = 1;
    if (meta?.total) {
        pageCount = Math.ceil(meta.total / limit);
    }

    useEffect(() => {
        setQuery((prev: any) => ({ ...prev, page, limit }));
    }, [page, limit, setQuery]);

    useEffect(() => {
        if (meta?.page) setPage(meta.page);
    }, [meta?.page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleLimitChange = (event: SelectChangeEvent<number>) => {
        setLimit(Number(event.target.value));
        setPage(1);
    };
    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // position: "relative",
            }}
        >
            <Typography>Total: {meta?.total}</Typography>

            <Pagination
                color="primary"
                count={pageCount}
                page={page}
                onChange={handleChange}
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    // position: "absolute",
                    // left: 0,
                }}
            >
                <Typography variant="body2">Rows Per Page:</Typography>
                <FormControl size="small">
                    <Select
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                        }}
                        value={limit}
                        onChange={handleLimitChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default N_Pagination;
