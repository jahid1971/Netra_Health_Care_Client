"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchBar from "./Searchbar";
import DoctorAiSuggestionPanel from "./DoctorAiSuggestionPanel";
import { useSearchParams } from "next/navigation";

interface DoctorPageClientWrapperProps {
    children: React.ReactNode;
    withDashboardLayout?: boolean;
}

const DoctorPageClientWrapper = ({
    children,
    withDashboardLayout,
}: DoctorPageClientWrapperProps) => {
    const [aiOpen, setAiOpen] = useState(false);
    const searchParams = useSearchParams();

    React.useEffect(() => {
        if (searchParams.get("ai") === "1") {
            setAiOpen(true);
        }
    }, [searchParams]);

    return (
        <Box
            px={!withDashboardLayout ? { xs: 0, md: 3 } : 0}
            py={!withDashboardLayout ? 3 : 0}
            sx={{
                position: "relative",
                maxWidth: "100%",
                boxSizing: "border-box",
                width: "100%",
            }}
        >
            {/* Sticky Header Section */}
            <Box
                sx={{
                    position: "sticky",
                    top: 64,
                    zIndex: 1201,
                    background: grey[100],
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    marginLeft: 0,
                    marginRight: 0,
                    left: 0,
                }}
            >
                {/* CategoryTabs will be rendered here by the server component */}
                { !aiOpen && React.Children.toArray(children)[0]}
            </Box>

            <Box>
                <SearchBar aiOpen={aiOpen} setAiOpen={setAiOpen} />
            </Box>

            <DoctorAiSuggestionPanel aiOpen={aiOpen} setAiOpen={setAiOpen} />

            {/* Doctor Results Section - passed from server component */}
            {!aiOpen && React.Children.toArray(children)[1]}
        </Box>
    );
};

export default DoctorPageClientWrapper;
