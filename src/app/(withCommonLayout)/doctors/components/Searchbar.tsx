"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Box, Stack, Button } from "@mui/material";
import { useAppDispatch, useDebounced } from "@/redux/hooks";
import React, { useEffect, useCallback } from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import {
    setSearchTerm,
    useSearchTermSelector,
} from "@/redux/slices/generalSlices";
import AiDoctorSuggestionsButton from "@/components/ui/doctor/AiDoctorSuggestionsButton";

interface SearchBarProps {
    aiOpen: boolean;
    setAiOpen: (open: boolean) => void;
}

const SearchBar = ({ aiOpen, setAiOpen }: SearchBarProps) => {
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
            params.delete("specialty");
            params.set("searchTerm", debouncedSearchTerm);
        } else {
            params.delete("searchTerm");
        }
        router.push(`?${params.toString()}`);
    }, [debouncedSearchTerm, router, searchParams]);

    const handleInputChange = useCallback(
        (event: any) => {
            dispatch(setSearchTerm(event.target.value));
        },
        [dispatch]
    );
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
            mt={2}
            alignItems="flex-start"
        >
            <Box
                sx={{
                    position: "relative",
                    minWidth: 0,
                    transition:
                        "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
                    transform: aiOpen ? "translateX(-120%)" : "translateX(0)",
                    opacity: aiOpen ? 0 : 1,
                    zIndex: aiOpen ? 0 : 2,
                    flex: 1,
                }}
            >
                <TextField
                    label="Search Doctor by Name or Specialty....."
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    value={searchTerm || ""}
                    sx={{ backgroundColor: "white" }}
                />
            </Box>
            <Box
                sx={{
                    minWidth: { xs: "100%", sm: aiOpen ? "100%" : "auto" },
                    flex: aiOpen ? 1 : undefined,
                    transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
                    display: "flex",
                    justifyContent: { xs: "flex-start", sm: "flex-end" },
                    transform: aiOpen
                        ? { xs: "translateX(0)", sm: "translateX(-76%)" }
                        : "translateX(0)",
                }}
            >
                <Button
                    startIcon={<PsychologyIcon />}
                    onClick={() => setAiOpen(!aiOpen)}
                    aria-pressed={aiOpen}
                    aria-expanded={aiOpen}
                    sx={{
                        px: 3,
                        py: 0.8,
                        textTransform: "none",
                        borderColor: "primary.main",
                        minWidth: "280px",
                        transition: "all .35s ease",
                    }}
                >
                    {aiOpen
                        ? "Hide AI Suggestions"
                        : "Get Doctor Suggestions with AI Help"}
                </Button>
            </Box>
        </Stack>
    );
};

export default SearchBar;
