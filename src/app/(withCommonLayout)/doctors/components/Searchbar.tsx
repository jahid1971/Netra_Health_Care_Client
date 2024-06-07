"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TextField } from "@mui/material";
import { useAppDispatch,  useDebounced } from "@/redux/hooks";
import { useEffect} from "react";
import {

    setSearchTerm,
    useSearchTermSelector,
} from "@/redux/slices/generalSlices";

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchTerm = useSearchTermSelector();
    const dispatch = useAppDispatch();

    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 500,
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearchTerm) {
            params.set("searchTerm", debouncedSearchTerm);
        } else {
            params.delete("searchTerm");
        }
        router.push(`?${params.toString()}`);

    }, [debouncedSearchTerm, router, searchParams]);

    const handleInputChange = (event: any) => {
        dispatch(setSearchTerm(event.target.value));
    };

    return (
        <TextField
            label="Search Doctor by Name or Specialty....."
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            // defaultValue={searchParams.get("searchTerm") || ""}
            value={searchTerm ||  ""}
            sx={{ backgroundColor: "white" }}
        />
    );
};

export default SearchBar;
