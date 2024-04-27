import { IMeta } from "@/types/common";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";


interface PaginationProps {
    setQuery: (queryUpdater: (prevQuery: any) => any) => void;
    meta: IMeta;
}


const N_Pagination = ({ setQuery, meta }:PaginationProps) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    let pageCount: number = 1;
    if (meta?.total) {
        pageCount = Math.ceil(meta.total / limit);
    }

    useEffect(() => {
        setQuery((prev: any) => ({ ...prev, page, limit }));
    }, [page, limit, setQuery]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                justifyContent: "center",
            }}>
            <Pagination color="primary" count={pageCount} page={page} onChange={handleChange} />
        </Box>
    );
};

export default N_Pagination;
